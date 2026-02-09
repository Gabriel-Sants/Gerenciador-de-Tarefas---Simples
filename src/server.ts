import 'dotenv/config'

import { app } from './app.js'

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server Rodando na porta ${process.env.PORT || 3000}`)
})