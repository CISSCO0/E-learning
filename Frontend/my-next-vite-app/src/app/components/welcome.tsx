import Image from 'next/image'
import './styles/global.css';
import './styles/styles.css';
import './welcome.module.css';
export default function Welcome() {
  return (
    <section className="welcome-section">
      <Image
        src="/placeholder.svg?height=1080&width=1920"
        alt="Background"
        layout="fill"
        objectFit="cover"
      />
      <div className="welcome-content">
        <h1 className="welcome-title">Welcome to EduPlatform</h1>
        <p className="welcome-subtitle">Discover the best courses and connect with top instructors and students.</p>
      </div>
    </section>
  )
}

