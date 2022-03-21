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

describe("Criar comentários.", () => {
  test("Não deve ser possível adicionar um comentário se não estiver autenticado.", async () => {
    const response = await fetch("http://localhost:3001/api/v1/like", {
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
  test("Deve ser possível adicionar um like a um post se estiver autenticado.", async () => {
    const response = await fetch("http://localhost:3001/api/v1/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        postId: 1,
        userId: 1,
        test: true,
      }),
    });
    expect(response.status).toBe(201);
    const json = await response.json();
    expect(Number(json.like.id) > 0).toBe(true);
  });
  test("Deve ser possível adicionar um like a um comentário se estiver autenticado.", async () => {
    const response = await fetch("http://localhost:3001/api/v1/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        commentId: 1,
        userId: 1,
        test: true,
      }),
    });
    expect(response.status).toBe(201);
    const json = await response.json();
    expect(Number(json.like.id) > 0).toBe(true);
  });
});
