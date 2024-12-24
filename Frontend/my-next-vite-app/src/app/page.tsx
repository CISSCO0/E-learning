
    import Welcome from './components/welcome';
    import BestCourses from './components/bestcourses';
    import BestInstructors from './components/bestinstructors';
    import BestStudents from './components/beststudents';
    import Reviews from './components/reviews';
    import Footer from './components/footer';
    
    export default function Home() {
      return (
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            <Welcome />
            <BestCourses />
            <BestInstructors />
            <BestStudents />
            <Reviews />
          </main>
          <Footer />
        </div>
      )
    }

    
