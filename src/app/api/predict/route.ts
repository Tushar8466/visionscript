import { NextResponse } from 'next/server';
import * as tf from '@tensorflow/tfjs-node';
import { createCanvas, loadImage } from 'canvas';

// Cache for the model to avoid reloading on every request
let model: any = null;
let labels: string[] = [];

/**
 * Loads the Teachable Machine model and metadata
 */
async function loadModel() {
  if (model) return { model, labels };

  const modelURL = process.env.NEXT_PUBLIC_MODEL_URL || 'https://teachablemachine.withgoogle.com/models/O7jYEzYD2/';
  
  try {
    console.log('Loading model from:', modelURL);
    model = await tf.loadLayersModel(`${modelURL}model.json`);
    const metadataResponse = await fetch(`${modelURL}metadata.json`);
    const metadata = await metadataResponse.json();
    labels = metadata.labels;
    return { model, labels };
  } catch (error) {
    console.error('Error loading Teachable Machine model:', error);
    throw new Error('Failed to load model');
  }
}

/**
 * Preprocesses an image from a buffer
 */
async function preprocessImage(imageBuffer: Buffer) {
  const size = 224;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const img = await loadImage(imageBuffer);
  ctx.drawImage(img, 0, 0, size, size);
  
  return tf.browser.fromPixels(canvas as any)
    .toFloat()
    .div(tf.scalar(127.5))
    .sub(tf.scalar(1))
    .expandDims(0);
}

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const { model, labels } = await loadModel();
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');
    const tensor = await preprocessImage(imageBuffer);

    // Predict
    const predictions = await model.predict(tensor) as tf.Tensor;
    const scores = await predictions.data();
    
    const results = Array.from(scores).map((score, i) => ({
      className: labels[i] || `Class ${i}`,
      probability: Number(score)
    })).sort((a, b) => b.probability - a.probability);

    // Forward output to n8n
    const n8nWebhookUrl = 'https://n8n-1wtq.onrender.com';
    try {
      fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'captions_ai_studio',
          results,
          topPrediction: results[0],
          timestamp: new Date().toISOString()
        })
      }).catch(err => console.error('n8n background fetch error:', err));
    } catch (e) {
      console.error('n8n trigger failed:', e);
    }

    // Cleanup
    tensor.dispose();
    predictions.dispose();

    return NextResponse.json({ 
      success: true, 
      predictions: results,
      topPrediction: results[0]
    });

  } catch (error: any) {
    console.error('Prediction error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
  }
}
