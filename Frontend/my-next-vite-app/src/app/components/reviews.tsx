import './styles/global.css';
import './styles/styles.css';
import './welcome.module.css';
export default function Reviews() {
    const reviews = [
      { id: 1, name: "John D.", content: "Great platform! I've learned so much.", rating: 5 },
      { id: 2, name: "Sarah M.", content: "The instructors are top-notch.", rating: 4 },
      { id: 3, name: "Mike R.", content: "Excellent courses and community.", rating: 5 },
    ]
  
    return (
      <section className="section">
        <div className="container">
          <h2 className="section-title">Reviews</h2>
          <div className="card-grid">
            {reviews.map((review) => (
              <div key={review.id} className="card">
                <p>{review.content}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                  <span>{review.name}</span>
                  <span>{"★".repeat(review.rating)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  