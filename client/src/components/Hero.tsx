const Hero = () => {
  return (
    <div className='bg-[#000300] text-white'> {/* Changed to white text for contrast */}
      <div className='w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-2'>
          This platform helps you manage students, courses, and classrooms efficiently.
        </p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
          Welcome to
        </h1>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
          My Classroom Manager
        </h1>

        {/* Adjusted the flexbox properties */}
        <div className="flex flex-row justify-center space-x-4 mt-6">
          <button className='bg-[#00df9a] w-[100px] rounded-md font-medium py-3 text-black hover:bg-[#00cf8a]'>
            Students
          </button>
          <button className='bg-[#00df9a] w-[100px] rounded-md font-medium py-3 text-black hover:bg-[#00cf8a]'>
            Classes
          </button>
          <button className='bg-[#00df9a] w-[100px] rounded-md font-medium py-3 text-black hover:bg-[#00cf8a]'>
            Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
