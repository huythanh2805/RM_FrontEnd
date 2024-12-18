import Pagination from "@/components/Pagination";
import BASE_URL from "@/configs";
import { useCart } from "@/contexts/CartProvider";
import { useThemeContext } from "@/contexts/ThemeProvider";
import { toast } from "@/hooks/use-toast";
import { formatCurrency } from "@/utilities/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MenuItem from "../MenuItem";
import SectionTitle from "./SectionTitle";
import { Range, getTrackBackground } from "react-range";

const Menu = ({ limit, isFilter = true }) => {
  const { colorCode } = useThemeContext();
  const { addItem } = useCart();
  const [dishes, setDishes] = useState([]);
  const [combos, setCombos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 6;
  const [searchValue, setSearchValue] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [sliderValues, setSliderValues] = useState([0, 500000]);

  const [opacity, setOpacity] = useState(1);
  const [translateY, setTranslateY] = useState(0);
  const categoryImages = {
    "Món chính": "monchinh.png",
    "Khai vị": "khaivi.png",
    "Tất cả": "tatca.png",
    "Đồ uống": "douong.png",
    "Tráng miệng": "trangmieng.png",
    "Combo món": "monchinh.png",
  };

  const location = useLocation();
  const isMenuPage = location.pathname === "/menu";

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 0;
      const fadeEnd = 200;

      let newOpacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart);
      newOpacity = Math.max(0, Math.min(1, newOpacity));
      setOpacity(newOpacity);

      const newTranslateY = Math.min(30, scrollY / 10);
      setTranslateY(newTranslateY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    axios
      .get(BASE_URL + "/dishes")
      .then((res) => {
        setDishes(res.data.filter((item) => item.isShow));
        const allCategoryName = [
          ...new Set(res.data.map((item) => item.category_id.name)),
        ];
        setCategories(["Tất cả", "Combo món", ...allCategoryName]);
      })
      .catch((error) => {
        console.error(
          error.response ? error.response.data.data : error.message
        );
      });

    axios
      .get(BASE_URL + "/setCombos")
      .then((res) => {
        const filteredCombos = res.data.filter((item) => item.isShow);
        console.log("here", filteredCombos);

        const combosWithType = filteredCombos.map((item) => {
          return {
            ...item,
            type: "combo",
          };
        });

        setCombos(combosWithType);
      })
      .catch((error) => {
        console.error(
          error.response ? error.response.data.data : error.message
        );
      });
  }, []);

  const combinedItems =
    selectedCategory === "Tất cả"
      ? [...dishes, ...combos]
      : selectedCategory === "Combo món"
      ? combos
      : dishes.filter((dish) => dish.category_id.name === selectedCategory);

  const filterDishes = combinedItems.filter((dish) => {
    const matchesCategory =
      selectedCategory === "Tất cả" ||
      selectedCategory === "Combo món" ||
      dish.category_id.name === selectedCategory;

    const matchesPrice =
      dish.price >= priceRange.min && dish.price <= priceRange.max;

    const matchesSearchValue = dish.name
      .toLowerCase()
      .includes(searchValue.toLowerCase());

    return matchesCategory && matchesSearchValue && matchesPrice;
  });

  const limitDishes = limit ? filterDishes.slice(0, limit) : filterDishes;

  // Phân trang
  const startIndex = (currentPage - 1) * itemPerPage;
  const currentItems = limitDishes.slice(startIndex, startIndex + itemPerPage);
  const pageCount = Math.ceil(limitDishes.length / itemPerPage);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const handleAddToCart = (item) => {
    // Kiểm tra nếu item là combo hoặc món ăn
    const itemType = item.type || "dish"; // Nếu không có type, mặc định là "dish"

    if (itemType === "combo") {
      // Xử lý khi item là combo
      toast({
        variant: "success",
        title: `Thêm thành công Combo: ${item.name}`,
      });
      addItem({
        dish_id: item._id,
        name: item.name,
        price: item.price,
        image: item.images[0],
        quantity: 1,
        type: "combo", // Đảm bảo type là combo
      });
    } else {
      // Xử lý khi item là món ăn (dish)
      toast({
        variant: "success",
        title: `Thêm thành công Món ăn: ${item.name}`,
      });
      addItem({
        dish_id: item._id,
        name: item.name,
        price: item.price,
        image: item.images[0],
        quantity: 1,
        type: "dish", // Đảm bảo type là dish
      });
    }
  };

  return (
    <div className="w-full relative">
      {isMenuPage && (
        <div className="relative w-full h-[150px] sm:h-[200px] lg:h-[300px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('imgs/pagetitle-about.jpg')",
              backgroundAttachment: "fixed",
              filter: "brightness(0.7)",
            }}
          ></div>
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div
            className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4 sm:px-6 lg:px-8"
            style={{
              opacity: opacity,
              transform: `translateY(-${translateY}px)`,
              transition: "opacity 0.3s, transform 0.3s",
            }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold dancing">
              Thực Đơn
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg mt-4 flex items-center justify-center text-center">
              <span className="bg-white p-1 rounded-full mr-2 hidden lg:block"></span>
              <span className="bg-white h-[2px] w-[60px] sm:w-[80px] md:w-[100px] lg:w-[120px] hidden lg:block"></span>
              <span className="ml-2 sm:ml-4">
                Những món ăn đa dạng đang chờ bạn đến thưởng thức
              </span>
              <span className="bg-white h-[2px] w-[60px] sm:w-[80px] md:w-[100px] lg:w-[120px] ml-2 sm:ml-4 hidden lg:block"></span>
              <span className="bg-white p-1 rounded-full ml-2 hidden lg:block"></span>
            </p>
          </div>
        </div>
      )}

      {!isMenuPage && <SectionTitle title={"THỰC ĐƠN"} desc={"Thực đơn hôm nay"} color={colorCode} />}

      <div className={`w-full flex ${isFilter ? "p-10" : "p-5"} justify-center`}>
        {/* Filter */}
        {isFilter && (
          <div className="w-[300px] mt-5 flex flex-col gap-5 items-center">
            {/* Lọc theo danh mục */}
            <div class="w-full border border-[#fb6340] text-[#fb6340] p-5 rounded-lg shadow-lg">
              <div class="bg-[#fb6340] text-white font-bold text-lg p-3 mb-5 rounded-lg">
                DANH MỤC
              </div>

              <div class="space-y-4">
                {categories.map((category, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 items-center cursor-pointer transition duration-300 ${
                      selectedCategory === category
                        ? "text-orange-500 font-bold"
                        : "text-gray-500"
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition ${
                        selectedCategory === category
                          ? "border-orange-500 bg-orange-100"
                          : "border-gray-300"
                      }`}
                      style={{ borderColor: colorCode }}
                    >
                      <img
                        src={`imgs/${categoryImages[category]}`}
                        alt=""
                        className="w-15 h-15 text-black object-contain"
                      />
                    </div>
                    <span>{category}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lọc theo khoảng giá */}
            <div className="w-full border border-[#fb6340] text-[#fb6340] p-5 rounded-lg shadow-lg">
              <div className="bg-[#fb6340] text-white font-bold text-lg p-3 mb-5 rounded-lg">
                Khoảng giá
              </div>

              <div className="flex flex-col items-center gap-5">
                <Range
                  step={10000}
                  min={0}
                  max={500000}
                  values={sliderValues}
                  onChange={(values) => {
                    setSliderValues(values);
                    setPriceRange({ min: values[0], max: values[1] });
                  }}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "6px",
                        width: "100%",
                        background: getTrackBackground({
                          values: sliderValues,
                          colors: ["#fb6340", "#ccc", "#fb6340"],
                          min: 0,
                          max: 500000,
                        }),
                        borderRadius: "4px",
                      }}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props, index }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "20px",
                        width: "20px",
                        borderRadius: "50%",
                        backgroundColor: "#FFF",
                        border: "2px solid #fb6340",
                        boxShadow: "0px 2px 6px #AAA",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "-28px",
                          color: "#fff",
                          fontSize: "12px",
                          fontWeight: "bold",
                          padding: "2px",
                          borderRadius: "4px",
                          backgroundColor: "#fb6340",
                        }}
                      >
                        {formatCurrency(sliderValues[index])}
                      </div>
                    </div>
                  )}
                />
                <div className="flex justify-between w-full text-sm font-semibold">
                  <span>Từ: {formatCurrency(sliderValues[0])}</span>
                  <span>Đến: {formatCurrency(sliderValues[1])}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={isFilter ? "w-[1024px]" : "w-full"}>
          {isFilter && (
            <div className="w-full px-4 sm:px-40 lg:px-8">
              <div className="w-full flex items-end justify-between border-b-2 border-[#fb6340] pb-4">
                <p className="text-[#fb6340] text-3xl font-semibold">Danh sách món ăn</p>

                {/* Input Search */}
                <div className="w-full max-w-sm min-w-[200px] relative">
                  <label htmlFor="Search" className="sr-only">
                    Search
                  </label>

                  <input
                    type="text"
                    id="Search"
                    placeholder="Tìm kiếm món ăn..."
                    className="bg-white border border-orange-300 text-orange-900 text-sm rounded-xl w-full p-3 shadow-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    onChange={handleSearchValue}
                    value={searchValue}
                  />

                  <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                    <button
                      type="button"
                      className="text-orange-600 hover:text-orange-800"
                    >
                      <span className="sr-only">Search</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Navbar tạm ẩm */}
          {/* <div className="flex flex-wrap justify-center items-center gap-8 mt-10 sm:flex-row sm:justify-center sm:gap-6 md:gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`flex flex-col items-center cursor-pointer transition duration-300 ${
                  selectedCategory === category
                    ? "text-orange-500 font-bold"
                    : "text-gray-500"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                <div
                  className={`w-20 h-20 flex items-center justify-center rounded-full border-2 transition ${
                    selectedCategory === category
                      ? "border-orange-500 bg-orange-100"
                      : "border-gray-300"
                  }`}
                  style={{ borderColor: colorCode }}
                >
                  <img
                    src={`imgs/${categoryImages[category]}`}
                    alt={category}
                    className="w-15 h-[50px] text-black"
                  />
                </div>

                <span className="mt-2" style={{ color: colorCode }}>
                  {category}
                </span>
              </div>
            ))}
          </div> */}

          {/* Danh sách món ăn */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-5 max-w-5xl mx-auto mb-8 px-4 sm:px-40 lg:px-8">
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <MenuItem
                  key={item._id}
                  item={item}
                  onCLick={handleAddToCart}
                />
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center">
                <p className="text-gray-500">Không tìm thấy món ăn !!</p>
              </div>
            )}
          </div>

          {/* Phân trang */}
          {pageCount > 1 && (
            <div className="w-full items-center">
              <Pagination
                pageCount={pageCount}
                onPageChange={handlePageClick}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
