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
     // Delete location
  const deleteLocation = (_id) => {
    const fetData = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/reservations/locations/" + _id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store", // Disable caching
          },
        })

        if (!res.ok) {
          toast({
            variant: "destructive",
            title: "Can't delete this location location orders",
          })
        }
        const data = await res.json()
        toast({
          variant: "sucess",
          title: data.message,
        })
        // After updating table order trigger useState for fetching newest data

        //  Update useState currently to re-render
        setLocations((pre) => {
          if (pre === null) return null
          return [...pre.filter((item) => item._id !== _id)]
        })
      } catch (error) {
        setLoading(false)
        console.log(error)
        toast({
          variant: "destructive",
          title: "Something wrong with delete Location!",
        })
      }
    }
    fetData()
  }
  // Delete table
  const deleteTable = (_id) => {
    const fetData = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/reservations/tables/" + _id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store", // Disable caching
          },
        })

        if (!res.ok) {
          toast({
            variant: "destructive",
            title: "Can't delete this location location orders",
          })
        }
        // After updating table order trigger useState for fetching newest data

        // Update useState currently to re-render
        setTables((pre) => {
          if (pre === null) return null
          return [...pre.filter((item) => item._id !== _id)]
        })
      } catch (error) {
        setLoading(false)
        console.log(error)
        toast({
          variant: "destructive",
          title: "Something wrong with delete Location!",
        })
      }
    }
    fetData()
  }
  // Update information for table
  const updateTable = ({
    number_of_seats,
    name,
    table_id,
  }) => {
    const fetData = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/reservations/tables/" + table_id, {
          method: "PATCH",
          body: JSON.stringify({ number_of_seats, name }),
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store", // Disable caching
          },
        })

        if (!res.ok) {
          return toast({
            variant: "destructive",
            title: "Can't update this table",
          })
        }
        // Get new tables after add table
        const refreshData = await fetch("/api/reservations/tables", {
          method: "GET",
        })
        const freshTables = await refreshData.json()
        setTables(freshTables.tables)
        setNumberOfTable(freshTables.numberOfTable)
      } catch (error) {
        setLoading(false)
        console.log(error)
        toast({
          variant: "destructive",
          title: "Something wrong with update this table!",
        })
      }
    }
    fetData()
  }
  // Update information for location
  const updateLocation = ({
    locationInRestaurant,
    location_id,
  }) => {
    const fetData = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/reservations/locations/" + location_id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store", // Disable caching
          },
          body: JSON.stringify({ locationInRestaurant }),
        })

        if (!res.ok) {
          return toast({
            variant: "destructive",
            title: "Can't update this location",
          })
        }
        // Get new locations after add location
        const refreshData = await fetch("/api/reservations/locations", {
          method: "GET",
        })
        const freshLocations = await refreshData.json()
        setLocations(freshLocations.locations)
        setNumberOfLocation(freshLocations.numberOfLocation)
      } catch (error) {
        setLoading(false)
        console.log(error)
        toast({
          variant: "destructive",
          title: "Something wrong with update this location!",
        })
      }
    }
    fetData()
  }
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