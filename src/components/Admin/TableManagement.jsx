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
     // Get id array for sortableContext items
  const locationsIds = useMemo(
    () => locations?.map((location) => location._id),
    [locations]
  )
  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
      },
    })
  )
  return (
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
        <DndContext
          sensors={sensors}
          // collisionDetection={closestCenter}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          {locations && locationsIds && tables && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-11 lg:gap-14 ">
              <SortableContext
                items={locationsIds}
                strategy={rectSortingStrategy}
              >
                {locations.map((location) => {
                  return (
                    <Location
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
              </SortableContext>
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
          {typeof window === "object" &&
            createPortal(
              <DragOverlay>
                {activedLocation && tables && (
                  <Location
                    location={activedLocation}
                    tables={tables?.filter(
                      (item) => item.location_id === activedLocation._id
                    )}
                    addNewTable={addNewTable}
                    deleteLocation={deleteLocation}
                    updateLocation={updateLocation}
                    deleteTable={deleteTable}
                    updateTable={updateTable}
                  ></Location>
                )}
                {activeTable && (
                  <Item
                    table={activeTable}
                    deleteTable={deleteTable}
                    updateTable={updateTable}
                  />
                )}
              </DragOverlay>,
              document.body
            )}
        </DndContext>
      </div>
    )}
  </div>
  )
  function handleDragStart(event) {
    const { active } = event

    if (!active.id || !active.data.current) return
    if (active.data.current.type === "location")
      setActivedLocation(active.data.current.location)
    if (active.data.current.type === "table")
      setActiveTable(active.data.current.table)
  }

  function handleDragOver(event) {
    const { active, over } = event
    if (!over) return
    const activeId = active.id
    const overId = over?.id

    if (activeId === overId) return
    if (!active.data.current || !over?.data.current) return
    // Sisuation 1 table over table
    if (
      active.data.current.type === "table" &&
      over.data.current.type === "table"
    ) {
      setTables((tables) => {
        if (!tables) return null
        const oldIndex = tables?.findIndex((table) => table._id === active.id)
        const newIndex = tables?.findIndex((table) => table._id === over.id)
        // if table is currently located in difference new location, move to new location
        if (tables[oldIndex].location_id !== tables[newIndex].location_id) {
          tables[oldIndex].location_id = tables[newIndex].location_id
        }
        const newTableArray = arrayMove(tables, oldIndex, newIndex)
        // After get new table array by arrayMove method, updata database based on newArray
        updateForTableOrder(newTableArray)
        return newTableArray
      })
    }
    // Sisuation 2 table over column
    if (
      active.data.current.type === "table" &&
      over.data.current.type === "location"
    ) {
      setTables((tables) => {
        if (!tables) return null
        const oldIndex = tables.findIndex((table) => table._id === active.id)
        const idLocation = over.data.current?.location._id
        tables[oldIndex].location_id = idLocation
        // After get new table array, updata database based on newArray
        updateForTableOrder(tables)
        return [...tables]
      })
    }
  }

  function handleDragEnd(event) {
    setActivedLocation(null), setActiveTable(null)
    const { active, over } = event
    if (!active.data.current || !over) return
    if (active.id === over.id) return
    if (!locations) return
    if (active.data.current.type === "location")
      setLocations(() => {
        const oldIndex = locations?.findIndex(
          (location) => location._id === active.id
        )
        const newIndex = locations?.findIndex(
          (location) => location._id === over.id
        )
        const newArray = arrayMove(locations, oldIndex, newIndex)
        // After get new location array by arrayMove method, updata database based on newArray
        updateForLocationOrder(newArray)
        return newArray
      })
  }
}

export default TableManagement