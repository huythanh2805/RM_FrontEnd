import { useThemeContext } from "@/contexts/ThemeProvider";
import { useEffect, useState } from "react";

const Promotion = () => {
  const [opacity, setOpacity] = useState(1);
  const [translateY, setTranslateY] = useState(0);
  const [selectedYear, setSelectedYear] = useState(null);
  const { colorCode } = useThemeContext();

  const data = [
    {
      year: 2012,
      content:
        "Golden Fork được thành lập bởi một nhóm đầu bếp và doanh nhân đầy đam mê. Với tầm nhìn trở thành biểu tượng của nghệ thuật ẩm thực, nhà hàng ra đời với không gian ấm cúng, thực đơn phong phú, và hương vị kết hợp tinh hoa ẩm thực truyền thống Việt Nam cùng sự sáng tạo hiện đại. Ngay từ ngày đầu mở cửa, Golden Fork đã nhanh chóng thu hút thực khách nhờ chất lượng món ăn và phong cách phục vụ chu đáo.",
      image: "imgs/timeline-1.jpg",
    },
    {
      year: 2016,
      content:
        "Sau 4 năm hoạt động thành công, Golden Fork mở chi nhánh thứ hai tại trung tâm thành phố – một bước ngoặt lớn trong hành trình phát triển. Không gian của chi nhánh mới được thiết kế sang trọng hơn, kết hợp ánh sáng và nội thất hiện đại, tạo nên trải nghiệm tinh tế cho thực khách. Năm 2016 cũng đánh dấu việc nhà hàng chính thức ra mắt thực đơn 'Signature Dishes', gồm các món ăn độc quyền được tạo ra bởi đội ngũ đầu bếp giàu kinh nghiệm.",
      image: "imgs/timeline-2.jpg",
    },
    {
      year: 2020,
      content:
        "Golden Fork tự hào khi được vinh danh là 'Nhà hàng tốt nhất năm 2020' trong hạng mục ẩm thực tại khu vực. Giải thưởng này không chỉ ghi nhận chất lượng món ăn mà còn là minh chứng cho sự sáng tạo không ngừng của đội ngũ. Cũng trong năm này, nhà hàng bổ sung các món ăn chay vào thực đơn, đáp ứng nhu cầu đa dạng của khách hàng và cam kết phát triển bền vững.",
      image: "imgs/timeline-3.jpg",
    },
    {
      year: 2022,
      content:
        "Đại dịch COVID-19 đã đặt ra những thách thức lớn cho ngành ẩm thực, và Golden Fork không phải ngoại lệ. Tuy nhiên, với sự nhanh nhạy trong việc thay đổi, nhà hàng đã triển khai dịch vụ đặt món online và giao hàng tận nơi, giúp khách hàng vẫn có thể tận hưởng hương vị quen thuộc ngay tại nhà. Đội ngũ không ngừng sáng tạo, giới thiệu các chương trình ưu đãi đặc biệt nhằm giữ chân khách hàng trung thành.",
      image: "imgs/timeline-4.jpg",
    },
    {
      year: 2024,
      content:
        "Bước ngoặt lớn nhất trong hành trình của Golden Fork chính là việc khai trương chi nhánh quốc tế đầu tiên tại Singapore. Đây là một dấu mốc quan trọng, thể hiện tầm nhìn và tham vọng vươn ra thị trường toàn cầu. Chi nhánh mới được thiết kế với phong cách hiện đại, giữ nguyên giá trị cốt lõi của thương hiệu, đồng thời mang lại trải nghiệm ẩm thực tinh tế, đáp ứng khẩu vị của thực khách quốc tế.",
      image: "imgs/timeline-5.jpg",
    },
  ];
  const logos = [
    "imgs/partner-01.png",
    "imgs/partner-02.png",
    "imgs/partner-03.png",
    "imgs/partner-02.png",
    "imgs/partner-01.png",
    "imgs/partner-02.png",
  ];

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

  return (
    <div>
      <div className="relative w-full h-[200px] overflow-hidden">
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
          className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white"
          style={{
            opacity: opacity,
            transform: `translateY(-${translateY}px)`,
            transition: "opacity 0.3s, transform 0.3s",
          }}
        >
          <h1 className="text-4xl md:text-3xl sm:text-3xl font-bold">KHUYẾN MÃI</h1>
          <p className="text-3xl md:text-[20px] sm:text-[15px] mt-4 flex items-center justify-center">
            <span className="bg-white p-1 rounded-full ml-0 mr-0 hidden lg:block"></span>
            <span className="bg-white h-[2px] w-[100px] hidden lg:block"></span>
            <span className="ml-4">Hãy ghé thăm nhà hàng của chúng tôi để nhận được nhiều ưu đãi</span>
            <span className="bg-white h-[2px] w-[100px] ml-4 hidden lg:block"></span>
            <span className="bg-white p-1 rounded-full ml-0 mr-0 hidden lg:block"></span>
          </p>
        </div>
      </div>

      <section>
        <div className="bg-white py-12 px-6">
          <div className="max-w-6xl mx-auto space-y-16">
            {/* Section 1: Ảnh bên trái - Chữ bên phải */}
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1">
                <img
                  src="https://luatvietphong.vn/wp-content/uploads/2021/08/4f661eafa00b1b249da13268a1bf900f.jpg"
                  alt="Laptop Sleeve"
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-4">Minimal and thoughtful</h2>
                <p className="text-gray-600 text-lg">
                  Our laptop sleeve is compact and precisely fits 13" devices. The zipper allows you to access the
                  interior with ease, and the front pouch provides a convenient place for your charger cable.
                </p>
              </div>
            </div>

            {/* Section 2: Ảnh bên phải - Chữ bên trái */}
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1 md:order-2">
                <img
                  src="https://bizflyportal.mediacdn.vn/thumb_wm/1000,100/bizflyportal/images/cac16316297062493.jpeg"
                  alt="Zipper Detail"
                  className="rounded-lg shadow-md"
                />
              </div>
              <div className="flex-1 md:order-1">
                <h2 className="text-2xl font-semibold mb-4">Refined details</h2>
                <p className="text-gray-600 text-lg">
                  We design every detail with the best materials and finishes. This laptop sleeve features durable
                  canvas with double-stitched construction, a felt interior, and a high-quality zipper that hold up to
                  daily use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Promotion;