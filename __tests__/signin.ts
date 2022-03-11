import fetch from "cross-fetch";

describe("Efetuar o login do usuário", () => {
  test("Devo receber uma mensagem de erro se as credenciais estiverem incorretas.", async () => {
    const response = await fetch("http://localhost:3001/api/v1/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "fabiocberg@gmail.com",
        password: "abcd12345",
      }),
    });
    expect(response.status).toBe(401);
  });
  test("Deve receber o token de autenticação.", async () => {
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
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(
      json.token != undefined && json.token != null && json.token.length > 0
    ).toBe(true);
  });
});
