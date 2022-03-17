import fetch from "cross-fetch";

let token = "";

beforeAll(async () => {
  const response = await fetch("http://localhost:3001/api/v1/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "fabiocberg@gmail.com",
      password: "abcd1234",
    }),
  });
  const json = await response.json();
  token = json.token;
});

describe("Criar um post", () => {
  test("Não deve ser possível criar um post se não estiver autenticado.", async () => {
    const response = await fetch("http://localhost:3001/api/v1/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: "Meu primeiro post.",
      }),
    });
    expect(response.status).toBe(401);
  });

  test("Poder criar um post estando autenticado.", async () => {
    const response = await fetch("http://localhost:3001/api/v1/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        text: "Meu primeiro post.",
        test: true,
      }),
    });
    expect(response.status).toBe(201);
    const json = await response.json();
    expect(Number(json.post.id) > 0).toBe(true);
  });
});
