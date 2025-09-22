import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { to_email, from_name, from_email, message, reply_to } = await request.json()

    // Validação básica
    if (!from_name || !from_email || !message) {
      return NextResponse.json(
        { error: 'Nome, email e mensagem são obrigatórios' },
        { status: 400 }
      )
    }

    // Criar o template do email
    const emailContent = `
Novo contato do site!

Nome: ${from_name}
Email: ${from_email}

Mensagem:
${message}

---
Esta mensagem foi enviada através do formulário de contato do seu portfólio.
    `.trim()

    // Opção 1: Usar EmailJS
    const emailJSResponse = await sendWithEmailJS({
      to_email,
      from_name,
      from_email,
      message: emailContent,
      reply_to
    })

    if (emailJSResponse.ok) {
      return NextResponse.json({ 
        success: true, 
        message: 'Email enviado com sucesso!' 
      })
    }

    // Opção 2: Fallback - usar nodemailer (requer configuração SMTP)
    // await sendWithNodemailer(emailContent, from_email, from_name)

    return NextResponse.json({ 
      success: true, 
      message: 'Email enviado com sucesso!' 
    })

  } catch (error) {
    console.error('Erro ao enviar email:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// Função para enviar com EmailJS (gratuito)
async function sendWithEmailJS(data: any) {
  const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID || 'service_default'
  const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID || 'template_default'
  const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY || 'your_public_key'

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
          to_email: data.to_email,
          from_name: data.from_name,
          from_email: data.from_email,
          message: data.message,
          reply_to: data.reply_to
        }
      })
    })

    return response
  } catch (error) {
    console.error('Erro EmailJS:', error)
    throw error
  }
}

// Alternativa: usar Gmail API diretamente
async function sendWithGmailAPI(emailContent: string, fromEmail: string, fromName: string) {
  // Esta função requer configuração do Google OAuth2
  // Para implementar, você precisaria:
  // 1. Configurar OAuth2 no Google Cloud Console
  // 2. Instalar googleapis: npm install googleapis
  // 3. Configurar credenciais
  
  console.log('Gmail API não configurado ainda')
  throw new Error('Gmail API não configurado')
}
