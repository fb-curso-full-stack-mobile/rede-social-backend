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

describe("Solicitação de amizade.", () => {
  test("Não deve ser possível solicitar amizade se não estiver autenticado.", async () => {
    const response = await fetch("http://localhost:3001/api/v1/friend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        friendId: 2,
      }),
    });
    expect(response.status).toBe(401);
  });

  test("Poder solicitar amizade estando autenticado.", async () => {
    const response = await fetch("http://localhost:3001/api/v1/friend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        friendId: 2,
        test: true,
      }),
    });
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.success).toBe(true);
  });

  test("Poder aceitar a solicitação estando autenticado.", async () => {
    console.log("token: ", token);
    const response = await fetch("http://localhost:3001/api/v1/friend/accept", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        friendId: 2,
        accepted: true,
        test: true,
      }),
    });
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.success).toBe(true);
  });
});
