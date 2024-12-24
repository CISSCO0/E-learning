// src/app/api/submit-feedback/route.ts

export async function POST(request: Request) {
    try {
      const formData = await request.formData()
  
      // Simulate feedback submission logic
      const title = formData.get('title')
      const description = formData.get('description')
      const rating = formData.get('rating')
  
      // Simulate delay to mimic a database operation
      await new Promise(resolve => setTimeout(resolve, 1000))
  
      console.log('Feedback submitted:', { title, description, rating })
  
      return new Response(
        JSON.stringify({ success: true, message: 'Feedback submitted successfully!' }),
        { status: 200 }
      )
    } catch (error) {
      return new Response(
        JSON.stringify({ success: false, message: 'An error occurred while submitting feedback.' }),
        { status: 500 }
      )
    }
  }
  