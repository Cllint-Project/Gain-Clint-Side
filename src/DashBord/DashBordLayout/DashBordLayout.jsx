import { Link, Outlet } from "react-router-dom";
import DashBord from "../DashBord";


const DashBordLayout = () => {
     return (
<div>
<div className='relative min-h-screen md:flex'>
{/* Sidebar */}
<DashBord />

{/* Outlet --> Dynamic content */}
<div className='flex-1 md:ml-64'>
<div className='p-5'>
<Outlet />
</div>
</div>
</div>
          </div>
     );
};

export default DashBordLayout;