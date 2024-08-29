export function splitMessage(message: string): string[] {
  const chunks = [];
  let currentChunk = '';

  message.split('\n').forEach((line) => {
    if (currentChunk.length + line.length > 2000) {
      chunks.push(currentChunk);
      currentChunk = line;
    } else {
      currentChunk += (currentChunk ? '\n' : '') + line;
    }
  });

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}
