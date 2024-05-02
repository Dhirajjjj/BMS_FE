import logo from "../../assets/icons/logo.png";

function NotFound() {
    return (
      <div class="flex flex-col w-full pt-32 items-center">
        <img src={logo} width={"450px"}/>
        <h2 class="text-2xl font-medium pt-8 pb-4">404: Page Not Found</h2>
        <text class="text-sm" >We dont seem to find what you're looking for</text>
      </div>
    );
}

export default NotFound;

