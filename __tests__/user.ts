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

describe("Buscar usuários.", () => {
  test("Não deve ser possível buscar usuários se não estiver autenticado.", async () => {
    const response = await fetch("http://localhost:3001/api/v1/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchTerm: "Teste",
      }),
    });
    expect(response.status).toBe(401);
  });

  test("Poder buscar usuários estando autenticado.", async () => {
    const response = await fetch("http://localhost:3001/api/v1/user/0/20", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        searchTerm: "Teste",
      }),
    });
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(Array.isArray(json.users)).toBe(true);
  });
});
