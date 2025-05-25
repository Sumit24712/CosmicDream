export default async function handler(req, res) {
  const { dreamText } = req.body;

  if (!dreamText) {
    return res.status(400).json({ error: "No dream text provided" });
  }

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an expert dream interpreter. Provide symbolic and psychological insights." },
          { role: "user", content: `Interpret this dream: ${dreamText}` }
        ]
      })
    });

    const result = await openaiRes.json();
    const interpretation = result.choices?.[0]?.message?.content || "Could not interpret dream.";

    res.status(200).json({ interpretation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong while interpreting." });
  }
}
