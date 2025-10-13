export function silenceTFLogs() {
  if (typeof window === 'undefined') return;

  const originalConsoleError = console.error;
  const ignorePatterns = [
    "INFO: Created TensorFlow Lite XNNPACK delegate for CPU",
    "TFLite",
    "XNNPACK"
  ];

  console.error = function (...args) {
    if (ignorePatterns.some((pattern) => args.join(" ").includes(pattern))) {
      return; // Ignore
    }
    originalConsoleError.apply(console, args);
  };
}
