# Registro de Ocorrências

Implementação prática da aula de 05/11/2026 sobre recursos do dispositivo e funcionamento offline.

## Conteúdos implementados

- Geolocalização com a API do navegador;
- seleção e pré-visualização de imagem;
- validação de tipo e tamanho da imagem;
- detecção dos estados online e offline;
- persistência de registros com `localStorage`;
- organização do JavaScript em módulos;
- cache dos arquivos com Service Worker;
- layout responsivo e mensagens de feedback.

## Como executar

Não abra o arquivo `index.html` diretamente. A aplicação utiliza módulos JavaScript e Service Worker, portanto precisa ser executada em um servidor local.

### Opção 1 — Live Server no VS Code

1. Abra a pasta `registro-ocorrencias` no VS Code.
2. Instale ou utilize a extensão Live Server.
3. Clique com o botão direito em `index.html`.
4. Selecione **Open with Live Server**.

### Opção 2 — servidor do Python

Abra o terminal dentro da pasta do projeto e execute:

```bash
python -m http.server 5500
```

Depois, acesse `http://localhost:5500` no navegador.

## Roteiro de validação

1. Abra a aplicação com conexão à internet e recarregue a página uma vez.
2. Confirme que o indicador informa **Conexão disponível**.
3. Preencha título e descrição e salve uma ocorrência.
4. Recarregue a página e confirme que o registro permanece salvo.
5. Clique em **Usar minha localização** e teste tanto a permissão concedida quanto a negada.
6. Selecione uma imagem de até 5 MB e confirme a pré-visualização.
7. No DevTools, abra **Application > Service Workers** e confirme que o Service Worker está ativado.
8. Ative o modo **Offline** na aba **Network**.
9. Recarregue a página e confirme que a interface continua disponível.
10. Cadastre uma ocorrência offline e verifique a indicação exibida no item.
11. Retorne ao modo online e confirme a atualização do status.

## Observações

- O primeiro acesso deve ocorrer online para que os arquivos sejam armazenados no cache.
- A foto é utilizada apenas na pré-visualização; o projeto salva somente o nome do arquivo.
- Os registros ficam no navegador e podem ser removidos pelo botão **Limpar registros** ou pela limpeza dos dados do site.
- Se os arquivos forem alterados, atualize `registro-ocorrencias-v1` para `registro-ocorrencias-v2` em `service-worker.js`.
