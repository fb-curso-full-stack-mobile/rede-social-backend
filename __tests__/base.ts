import fetch from "cross-fetch";

describe("Verificar se webserver está OK.", () => {
  test("Webserver deve retorna success true na rota de testes.", async () => {
    const response = await fetch("http://localhost:3001/api/v1", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.success).toBe(true);
  });
});
