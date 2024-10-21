import React, { useEffect, useMemo, useState } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
  DragOverlay,
} from "@dnd-kit/core"
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable"
import { Plus } from "lucide-react"
import { createPortal } from "react-dom"
import { FadeLoader } from "react-spinners"
import LocationComponent from "./Location/LocationComponent"
import TableComponent from "./table/TableComponent"
import { toast } from "@/hooks/use-toast"
import { ServerUrl } from "@/utilities/utils"



export default function TableManagement() {
  const [activedLocation, setActivedLocation] = useState(
    null
  )
  const [activeTable, setActiveTable] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingFirstOne, setLoadingFirstOne] = useState(false)
  const [locations, setLocations] = useState(null)
  const [numberOfLocation, setNumberOfLocation] = useState()
  const [tables, setTables] = useState(null)
  const [numberOfTable, setNumberOfTable] = useState()

  // Fetch all locations
  useEffect(() => {
    const fetData = async () => {
      setLoadingFirstOne(true)
      try {
        const res = await fetch(ServerUrl+"/api/reservations/locations", {
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
        const res = await fetch(ServerUrl+"/api/reservations/tables", {
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
  // Update for location orders
  const updateForLocationOrder = (newArray) => {
    const fetData = async () => {
      setLoading(true)
      try {
        const res = await fetch(ServerUrl+"/api/reservations/locations", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store", // Disable caching
          },
          body: JSON.stringify({ newArray: newArray }),
        })

        if (!res.ok) {
          toast({
            variant: "destructive",
            title: "Can't update location orders",
          })
        }
      } catch (error) {
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Something wrong with update Location!",
        })
      }
    }
    fetData()
  }
  // Update for table orders
  const updateForTableOrder = (newArray) => {
    const fetData = async () => {
      setLoading(true)
      try {
        const res = await fetch(ServerUrl+"/api/reservations/tables", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store", // Disable caching
          },
          body: JSON.stringify({ newArray: newArray }),
        })

        if (!res.ok) {
          toast({
            variant: "destructive",
            title: "Can't update location orders",
          })
        }
      } catch (error) {
        setLoading(false)
        toast({
          variant: "destructive",
          title: "Something wrong with update Location!",
        })
      }
    }
    fetData()
  }
  // Delete location
  const deleteLocation = (_id) => {
    const fetData = async () => {
      setLoading(true)
      try {
        const res = await fetch(ServerUrl+"/api/reservations/locations/" + _id, {
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
        const res = await fetch(ServerUrl+"/api/reservations/tables/" + _id, {
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
        const res = await fetch(ServerUrl+"/api/reservations/tables/" + table_id, {
          method: "PATCH",
          body: JSON.stringify({ number_of_seats, name }),
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!res.ok) {
          return toast({
            variant: "destructive",
            title: "Can't update this table",
          })
        }
        // Update Ui by updating tables
        setTables(currentTables=>[
          ...currentTables.map(table=> table._id === table_id ? {...table, number_of_seats, name} : table)
        ])
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
        const res = await fetch(ServerUrl+"/api/reservations/locations/" + location_id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ locationInRestaurant }),
        })

        if (!res.ok) {
          return toast({
            variant: "destructive",
            title: "Can't update this location",
          })
        }
          // Update Ui by updating tables
          setLocations(currentLocations=>[
            ...currentLocations.map(location=> location._id === location_id ? {...location, locationInRestaurant} : location)
          ])
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

  console.log({locations, locationsIds})
  return (
    <div>
      {loadingFirstOne ? (
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
          <FadeLoader
            color={"#11cdef"}
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
                    <LocationComponent
                      location={activedLocation}
                      tables={tables?.filter(
                        (item) => item.location_id === activedLocation._id
                      )}
                      addNewTable={addNewTable}
                      deleteLocation={deleteLocation}
                      updateLocation={updateLocation}
                      deleteTable={deleteTable}
                      updateTable={updateTable}
                    ></LocationComponent>
                  )}
                  {activeTable && (
                    <TableComponent
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
  // Add new Location
  function addNewLocation() {
    const addLocation = async () => {
      try {
        const res = await fetch(ServerUrl+"/api/reservations/locations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store", // Disable caching
          },
          body: JSON.stringify({ numberOfLocation }),
        })
        if (!res.ok) {
          return toast({
            variant: "destructive",
            title: "Can't get any data!",
          })
        }
        const data = await res.json()
        // Get new locations after add location
        const refreshData = await fetch(ServerUrl+"/api/reservations/locations", {
          method: "GET",
        })
        const freshLocations = await refreshData.json()
        setLocations(freshLocations.locations)
        setNumberOfLocation(freshLocations.numberOfLocation)
        toast({
          variant: "sucess",
          title: "Add location successfully!",
        })
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something wrong with get all dishes!",
        })
      }
    }
    addLocation()
  }
  // Add new Table
  function addNewTable(location_id) {
    const addTable = async () => {
      try {
        const res = await fetch(ServerUrl+"/api/reservations/tables", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store", // Disable caching
          },
          body: JSON.stringify({ order: numberOfTable, location_id }),
        })

        if (!res.ok) {
          return toast({
            variant: "destructive",
            title: "Can't add table",
          })
        }
        const data = await res.json()
        // Get new tables after add table
        const refreshData = await fetch(ServerUrl+"/api/reservations/tables", {
          method: "GET",
        })
        const freshTables = await refreshData.json()
        setTables(freshTables.tables)
        setNumberOfTable(freshTables.numberOfTable)
        toast({
          variant: "sucess",
          title: "Add table successfully",
        })
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Something wrong with add table!",
        })
      }
    }
    addTable()
  }
}
