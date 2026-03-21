import { pipeline, env } from '@xenova/transformers';

// Suppress local model loading since we fetch from HF hub
env.allowLocalModels = false;
env.useBrowserCache = true;

class PipelineSingleton {
  static task = 'automatic-speech-recognition' as const;
  static model = 'Xenova/whisper-tiny.en';
  static instance: any = null;

  static async getInstance(progress_callback: Function) {
    if (this.instance === null) {
      this.instance = await pipeline(this.task, this.model, { progress_callback });
    }
    return this.instance;
  }
}

// Listen for messages from the main thread
self.addEventListener('message', async (event) => {
  try {
    self.postMessage({ status: 'worker_started' });
    const { audio } = event.data;

    // Initialize pipeline
    const transcriber = await PipelineSingleton.getInstance((x: any) => {
      self.postMessage({ status: 'init_progress', ...x });
    });

    self.postMessage({ status: 'transcribing' });

    // Run the audio through Whisper
    const output = await transcriber(audio, {
      chunk_length_s: 30,
      stride_length_s: 5,
      return_timestamps: true,
      callback_function: (x: any) => {
        self.postMessage({ status: 'transcription_update', data: x });
      }
    });

    self.postMessage({ status: 'complete', output });
  } catch (error: any) {
    self.postMessage({ status: 'error', error: error.message || error.toString() });
  }
});
