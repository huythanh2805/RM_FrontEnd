import React from 'react'
import LocationComponent from './Location/LocationComponent'

const TableManagement = () => {
    const [locations, setLocations] = useState(null)
    const [loadingFirstOne, setLoadingFirstOne] = useState(false)
    const [tables, setTables] = useState(null)
        // Fetch all locations
    useEffect(() => {
      const fetData = async () => {
        setLoadingFirstOne(true)
        try {
          const res = await fetch("/api/reservations/locations", {
            method: "GET",
          })
  
          if (!res.ok) {
            toast({
              variant: "destructive",
              title: "Can't get any locations data!",
            })
          }
          const data = await res.json()
          setLocations(data.locations)
          setNumberOfLocation(data.numberOfLocation)
          setLoadingFirstOne(false)
        } catch (error) {
          setLoadingFirstOne(false)
          toast({
            variant: "destructive",
            title: "Something wrong with get all Locations!",
          })
        }
      }
      fetData()
    }, [])
    // Fetch all tables
    useEffect(() => {
      const fetData = async () => {
        setLoadingFirstOne(true)
        try {
          const res = await fetch("/api/reservations/tables", {
            method: "GET",
          })
  
          if (!res.ok) {
            toast({
              variant: "destructive",
              title: "Can't get any tables data!",
            })
          }
          const data = await res.json()
          setTables(data.tables)
          setNumberOfTable(data.numberOfTable)
          setLoadingFirstOne(false)
        } catch (error) {
          setLoadingFirstOne(false)
          toast({
            variant: "destructive",
            title: "Something wrong with get all Tables!",
          })
        }
      }
      fetData()
    }, [])
  return (
    <div className="w-full max-w-screen-2xl py-2 md:py-5 px-2 md:px-5 border">
     <div>
      {loadingFirstOne ? (
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
          <FadeLoader
            color={sideBarColor ? sideBarColor : "#11cdef"}
            loading={loadingFirstOne}
          />
        </div>
      ) : (
        <div className="bg-light-bg_2 dark:bg-dark-bg_2 px-3 lg:px-5 py-4 lg:py-6 rounded-md min-h-fit w-full">
          
            {locations && locationsIds && tables && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-11 lg:gap-14 ">
             
                  {locations.map((location) => {
                    return (
                      <LocationComponent
                        key={location._id}
                        location={location}
                        tables={tables?.filter(
                          (item) => item.location_id === location._id
                        )}
                        deleteLocation={deleteLocation}
                        updateLocation={updateLocation}
                        addNewTable={addNewTable}
                        deleteTable={deleteTable}
                        updateTable={updateTable}
                      />
                    )
                  })}
                <div
                  onClick={addNewLocation}
                  className="h-[550px] flex items-center justify-center border border-dashed border-light-primaryColor dark:border-dark-primaryColor opacity-45"
                >
                  <button className="w-[50px] h-[50px] flex items-center justify-center rounded-full border border-dashed border-light-primaryColor dark:border-dark-primaryColor">
                    <Plus />
                  </button>
                </div>
              </div>
            )}
           
        </div>
      )}
    </div>
    </div>
  )
}

export default TableManagement