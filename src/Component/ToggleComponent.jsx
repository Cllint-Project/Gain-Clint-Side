import { useState } from "react";
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';

const ToggleComponent = () => {
  const [activeTab, setActiveTab] = useState("P");
  return (
    <div>
      {/* <Tabs >
                    <TabList>
                         <Tab>Title 1</Tab>
                         <Tab>Title 2</Tab>
                    </TabList>

                    <TabPanel>
                         
                    </TabPanel>
                    <TabPanel>
                         <h2>Any content 2</h2>
                    </TabPanel>
               </Tabs> */}
      <div className="min-h-screen my-8">
        {/* Tab Buttons */}
        <div className="flex justify-center m-4">
          <button
            className={`px-6  py-2 font-semibold w-1/2 btn-sm rounded-lg ${
              activeTab === "P"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("P")}
          >
            P
          </button>
          <button
            className={`px-6 py-2 font-semibold w-1/2 btn-sm rounded-lg ml-4 ${
              activeTab === "PRO"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("PRO")}
          >
            PRO
          </button>
        </div>

        {/* Tab Content */}
        <div className=" mx-auto mt-8">
          {activeTab === "P" && (
            <div className="flex justify-center items-center ">
              <div className="grid grid-cols-1  gap-6">
                {/* Card 1 */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <img
                    src="https://images.pexels.com/photos/675920/pexels-photo-675920.jpeg?cs=srgb&dl=pexels-minan1398-675920.jpg&fm=jpg"
                    alt="P-45"
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <h3 className="text-xl font-semibold mt-4">P-45</h3>
                  <p className="text-gray-600 mt-2">
                    বিনিয়োগ পরিমাণ:{" "}
                    <span className="font-bold">1000.00TK</span>
                  </p>
                  <p className="text-gray-600">
                    বিনিয়োগ সময়কাল: <span className="font-bold">45 দিন</span>
                  </p>
                  <p className="text-gray-600">
                    মোট আয়: <span className="font-bold">2160.00TK</span>
                  </p>
                  <p className="text-gray-600">
                    দৈনিক আয়: <span className="font-bold">48.00TK</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "PRO" && (
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-700">PRO content goes here...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToggleComponent;
