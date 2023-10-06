type GenerateResponse = {
  result: string;
};

export async function completionTextService(
  prompt: string
): Promise<GenerateResponse> {
  const response = await fetch("/api/ai/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await response.json();

  return data;
}

// export function useAiGenerateText() {}
