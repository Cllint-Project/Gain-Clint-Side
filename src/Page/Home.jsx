import Banner from "../Component/Banner";
import Card from "../Component/Card";
import Question from "../Component/Question";
import WinnerModal from "../Component/WinnerModal";


const Home = () => {
     return (
          <div>
                 <WinnerModal />
               <Banner></Banner>
               <div className="my-12">
               <Card></Card>
               </div>
               <div>
               <Question></Question>
               </div>
          </div>
     );
};

export default Home;