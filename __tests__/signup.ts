import fetch from "cross-fetch";

describe("Cadastrar um usuário.", () => {
  test("Deve retornar o ID do usuário cadastrado.", async () => {
    const response = await fetch("http://localhost:3001/api/v1/sign-up", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: "Fulano",
        surname: "de Tal",
        email: "fulanodetal@gmail.com",
        password: "abcd1234",
        test: true,
      }),
    });
    expect(response.status).toBe(201);
    const json = await response.json();
    expect(Number.isInteger(json.user.id) && Number(json.user.id) > 0).toBe(
      true
    );
  });
});
