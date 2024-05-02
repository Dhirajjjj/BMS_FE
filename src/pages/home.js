import logo from '../assets/icons/logo.png'

function Home() {
    return (
        <div class="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/squared-bg-element.svg')] before:bg-no-repeat before:bg-top before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
        <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div class="flex w-full mb-4 justify-center"><img src={logo} width={"380px"} /></div>
            <div class="flex justify-center">
            <a class="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-sm text-gray-600 p-4 px-3 rounded-full transition hover:border-gray-300" href="/signup">
                Sign up to know more
                <span class="flex items-center gap-x-1">
                <span class="border-s border-gray-200 text-blue-600 ps-2">Explore</span>
                <svg class="flex-shrink-0 size-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </span>
            </a>
            </div>

            <div class="mt-5 max-w-xl text-center mx-auto">
            <h1 class="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl">
                The ultimate banking solution
            </h1>
            </div>

            <div class="mt-5 max-w-3xl text-center mx-auto">
            <p class="text-lg text-gray-600 font-md">Prosper Plus is crafted to support all financial needs for young entrepreneurs to well established businesses</p>
            </div>

            <div class="mt-8 gap-3 flex justify-center">
            <a class="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-md font-medium rounded-full py-3 px-12 " href="/login">
                Login
            </a>
            </div>
        </div>
        </div>
    );   
}

export default Home;