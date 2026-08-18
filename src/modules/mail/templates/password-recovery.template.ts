export function passwordRecoveryTemplate(code: string) {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Recuperação de senha</title>
      </head>

      <body
        style="
          margin: 0;
          padding: 0;
          background-color: #f4f5f7;
          font-family: Arial, Helvetica, sans-serif;
          color: #1f2937;
        "
      >
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="padding: 40px 16px;"
        >
          <tr>
            <td align="center">

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  max-width: 560px;
                  background-color: #ffffff;
                  border-radius: 16px;
                  overflow: hidden;
                  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                "
              >

                <tr>
                  <td
                    align="center"
                    style="
                      background-color: #6c5ce7;
                      padding: 32px 20px;
                    "
                  >
                    <h1
                      style="
                        margin: 0;
                        color: #ffffff;
                        font-size: 28px;
                      "
                    >
                      Splitly
                    </h1>

                    <p
                      style="
                        margin: 8px 0 0;
                        color: #eeeeff;
                        font-size: 14px;
                      "
                    >
                      Recuperação de senha
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 40px 32px;">

                    <h2
                      style="
                        margin: 0 0 16px;
                        font-size: 22px;
                        color: #111827;
                      "
                    >
                      Esqueceu sua senha?
                    </h2>

                    <p
                      style="
                        margin: 0 0 24px;
                        line-height: 1.6;
                        font-size: 15px;
                        color: #4b5563;
                      "
                    >
                      Recebemos uma solicitação para redefinir a senha
                      da sua conta no Splitly.
                    </p>

                    <p
                      style="
                        margin: 0 0 12px;
                        font-size: 15px;
                        color: #4b5563;
                      "
                    >
                      Utilize o código abaixo para continuar:
                    </p>

                    <div
                      style="
                        background-color: #f5f3ff;
                        border: 1px solid #ddd6fe;
                        border-radius: 12px;
                        padding: 22px;
                        text-align: center;
                        margin: 20px 0 24px;
                      "
                    >
                      <span
                        style="
                          font-size: 34px;
                          font-weight: bold;
                          letter-spacing: 10px;
                          color: #6c5ce7;
                        "
                      >
                        ${code}
                      </span>
                    </div>

                    <p
                      style="
                        margin: 0 0 24px;
                        font-size: 14px;
                        line-height: 1.6;
                        color: #6b7280;
                      "
                    >
                      Este código é válido por
                      <strong>15 minutos</strong>.
                    </p>

                    <div
                      style="
                        background-color: #f9fafb;
                        border-radius: 8px;
                        padding: 16px;
                      "
                    >
                      <p
                        style="
                          margin: 0;
                          font-size: 13px;
                          line-height: 1.6;
                          color: #6b7280;
                        "
                      >
                        Se você não solicitou a recuperação da sua senha,
                        pode ignorar este e-mail com segurança.
                      </p>
                    </div>

                  </td>
                </tr>

                <tr>
                  <td
                    align="center"
                    style="
                      border-top: 1px solid #eeeeee;
                      padding: 24px 20px;
                    "
                  >
                    <p
                      style="
                        margin: 0;
                        font-size: 12px;
                        color: #9ca3af;
                      "
                    >
                      © Splitly
                    </p>

                    <p
                      style="
                        margin: 6px 0 0;
                        font-size: 12px;
                        color: #9ca3af;
                      "
                    >
                      Este é um e-mail automático. Não responda esta mensagem.
                    </p>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}
