import Navigation from './Nav';

const Hero = () => {
  return (
    <div>
      <Navigation />
      <div className='bg-[#000300] text-white'> {/* Changed to white text for contrast */}
        <div className='w-full h-screen mx-auto text-center flex flex-col justify-center'>
          <p className='text-[#00df9a] font-bold p-2'>
            This platform helps you manage events, organizers, and attendees efficiently.
          </p>
          <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
            Welcome to
          </h1>
          <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
            My Event Management System
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
