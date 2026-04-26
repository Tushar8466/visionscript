export const runtime = 'nodejs';

import { NextResponse, NextRequest } from 'next/server';
import * as tf from '@tensorflow/tfjs';
import { createCanvas, loadImage } from 'canvas';

let model: tf.LayersModel | null = null;
let labels: string[] = [];

const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/O7jYEzYD2/';

async function ensureModelLoaded() {
  if (model && labels.length > 0) return;
  console.log('⏳ Loading model...');
  model = await tf.loadLayersModel(MODEL_URL + 'model.json');
  const res = await fetch(MODEL_URL + 'metadata.json');
  const meta = await res.json();
  labels = meta.labels;
  console.log('✅ Model ready. Labels:', labels);
}

async function preprocessImage(buffer: Buffer): Promise<tf.Tensor4D> {
  const size = 224;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const img = await loadImage(buffer);
  ctx.drawImage(img, 0, 0, size, size);
  const { data } = ctx.getImageData(0, 0, size, size);
  const rgb = new Float32Array(size * size * 3);
  for (let i = 0, j = 0; i < data.length; i += 4, j += 3) {
    rgb[j] = (data[i] / 127.5) - 1;
    rgb[j + 1] = (data[i + 1] / 127.5) - 1;
    rgb[j + 2] = (data[i + 2] / 127.5) - 1;
  }
  return tf.tensor4d(rgb, [1, size, size, 3]);
}

export async function POST(req: NextRequest) {
  let input: tf.Tensor | null = null;
  let output: tf.Tensor | null = null;

  try {
    const contentType = req.headers.get('content-type') || '';
    let buffer: Buffer;

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = (
        formData.get('image') ||
        formData.get('file') ||
        formData.get('data')
      ) as File | null;

      if (!file) {
        return NextResponse.json({ error: 'No file found' }, { status: 400 });
      }
      buffer = Buffer.from(await file.arrayBuffer());

    } else if (contentType.includes('application/json')) {
      const body = await req.json();
      if (!body.image) {
        return NextResponse.json({ error: 'No image in JSON' }, { status: 400 });
      }
      const base64 = body.image.replace(/^data:image\/\w+;base64,/, '');
      buffer = Buffer.from(base64, 'base64');

    } else {
      buffer = Buffer.from(await req.arrayBuffer());
      if (!buffer.length) {
        return NextResponse.json({ error: 'Empty body' }, { status: 400 });
      }
    }

    await ensureModelLoaded();

    input = await preprocessImage(buffer);
    output = model!.predict(input) as tf.Tensor;
    const scores = Array.from(await output.data());

    const predictions = scores
      .map((score, i) => ({
        className: labels[i] || `Class_${i}`,
        probability: parseFloat(score.toFixed(4)),
      }))
      .sort((a, b) => b.probability - a.probability);

    const top = predictions[0];
    console.log(`🏆 ${top.className} → ${(top.probability * 100).toFixed(1)}%`);

    return NextResponse.json({
      success: true,
      label: top.className,
      confidence: top.probability,
      topPrediction: top,
      predictions,
    });

  } catch (err: any) {
    console.error('❌ Error:', err.message);
    return NextResponse.json(
      { error: 'Prediction failed', details: err.message },
      { status: 500 }
    );
  } finally {
    input?.dispose();
    output?.dispose();
  }
}