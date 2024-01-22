
import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const people = [
  { id: 1, name: 'Wade Cooper' },
  { id: 2, name: 'Arlene Mccoy' },
  { id: 3, name: 'Devon Webb' },
  { id: 4, name: 'Tom Cook' },
  { id: 5, name: 'Tanya Fox' },
  { id: 6, name: 'Hellen Schmidt' },
]
const MyDropDown= ({selected, setSelected}) =>{
  const [query, setQuery] = useState('')
  const [cities, setCities] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries/US/regions/CA/cities',
        headers: {
          'X-RapidAPI-Key': '77982fd68fmshb126ddb002362c6p14947fjsnad5d7c4cd6d2',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
      };  
      try {
        const response = await axios.request(options);
        setCities(response?.data?.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [cities]); 
//console.log(cities)

  const filteredPeople =
    query === ''
      ? cities
      : cities?.filter((person) =>
          person?.city
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )
        
    return(
      <div className="w-full bg-transparent  ">
      <Combobox value={selected} onChange={setSelected} classname="bg-transparent 
      text-white border border-white">
        <div className="relative ">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg 
          py-[0.6%]
          bg-transparent border border-white
                  text-left sm:text-sm">
            <Combobox.Input
             placeholder="Where?"
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 bg-transparent 
              border border-white
              text-white"
              displayValue={(person) => person?.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
               className="h-4 w-4 text-white "
               aria-hidden="true"
              stroke-width="1.5" stroke="white" >
  <path stroke-linecap="round" stroke-linejoin="round"
   d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>

            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md
             bg-gray-500 z-50 py-1 text-base shadow-lg ring-1  focus:outline-none sm:text-sm">
              {filteredPeople?.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-white text-start">
                  Nothing found.
                </div>
              ) : (
                filteredPeople?.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-gray-600 text-white text-start' : 'text-white text-start'
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-start pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>)
}
const MyForm = () => {
  const [adminDivisionsData, setAdminDivisionsData] = useState(null);
  const [realtyMoleData1, setRealtyMoleData1] = useState(null);
  const [realtyMoleData2, setRealtyMoleData2] = useState(null);
  const [additionalData, setAdditionalData] = useState(null);
  const handleMultipleAPI = async () => {
    
  };


  return (
    <div className="max-w-3xl h-auto mx-auto my-8 p-6  bg-[#111827] text-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-start">Additional details?</h1>
      <p className="text-gray-500 mb-4 text-start">While we are generating your itinerary, let us know more about your trip - dietary preferences, existing plans, places you want to make sure to cover, etc.</p>
      <div className="mb-4">
        <label htmlFor="name" className="block text-white text-start text-sm font-bold mb-2">
        What time are you arriving / departing?
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-3 py-2 border border-gray-500  bg-transparent rounded-md "
          placeholder="Flying in thursday night..."
        />
      </div>
      <div className="mb-4">
        <label htmlFor="message" className="block text-White text-start text-sm font-bold mb-2">
        Additional information
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          className="w-full px-3 py-2 border border-gray-500  bg-transparent rounded-md resize-none focus:outline-none focus:shadow-outline"
          placeholder="I am vegeterian. I have wife and two kids"
        ></textarea>
      </div>
      <div className="mb-4">
        
        <button  className="w-full px-3 py-2 border font-semibold border-gray-500  bg-white
        text-[#111827] rounded-md "
        onClick={handleMultipleAPI}
        >Generate!</button>
        </div>
    </div>
  );
  }
const Hero = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
const [selected, setSelected] = useState(null)
const [showAlert, setShowAlert] = useState(false)
  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <section className="bg-black" style={{ backgroundImage: 'url("bg.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
  <div className="mx-to max-w-screen-xl px-4   lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl font-bold sm:text-3xl text-white">
      Simplify your trip planning with  
AI powered itineraries
      </h1>
      {showAlert && (
        <div className="fixed top-4 right-4 bg-red-500 text-white p-2 rounded-lg shadow-lg flex items-center">
        {/* Info icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-4 w-4 mr-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h0"
          ></path>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"></circle>
        </svg>
        {/* Your content for the top right div */}
        <p>Please fill all fields</p>
      </div>

      )}

      <div className="mt-14 flex flex-wrap justify-center gap-4">
        
      <div class="relative w-auto">
        <MyDropDown     
   selected={selected}
   setSelected={setSelected}
        />
</div>


<div class="relative w-auto ">
  
<div className="relative inline-block">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
      <svg class="w-3 h-3 text-white dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
    </svg>
      </div>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        className="bg-transparent border border-white 
        text-white text-sm rounded-lg  block w-full p-2.5 pl-9"
        placeholderText="Select date"
      />
    </div>
</div>
<button
   onClick={()=>  {
    if(selected === null || selectedDate === null ){
     setShowAlert(true)
    }
    else {
      setShowAlert(false)
      handleButtonClick()
    }
   }}
  className="relative bg-black px-12 mb-10 py-3 w-1/2 text-sm font-medium 
  text-white rounded-lg mt-10 hover:bg-black focus:outline-none focus:ring
   active:bg-black ring-blue-500"
  style={{
    boxShadow: '-12px -12px 20px -4px rgba(173, 216, 230, 0.7), 12px -12px 20px -4px pink, -12px 12px 20px -4px rgba(173, 216, 230, 0.7), 12px 12px 20px -4px pink',
  }}
>
  <span className="relative ">Generate Ltinerary</span>
</button>
      </div>
    </div>
    {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-85  flex items-center justify-center"
        //onClick={handleCloseModal}
        >
          <div className="bg-transparent p-6 rounded-lg w-full  h-full">
            <MyForm />
            {/* Add your modal content here */}
           
          </div>
        </div>
      )}
  </div>
</section>
  )
}

export default Hero
