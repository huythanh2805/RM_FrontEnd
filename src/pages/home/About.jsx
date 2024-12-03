import { useThemeContext } from "@/contexts/ThemeProvider";
import React, { useEffect, useState } from "react";

const About = () => {
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
            backgroundImage:
              "url('imgs/pagetitle-about.jpg')",
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
          <h1 className="text-4xl md:text-3xl sm:text-3xl font-bold">
            GIỚI THIỆU
          </h1>
          <p className="text-3xl md:text-[20px] sm:text-[15px] mt-4 flex items-center justify-center">
            <span className="bg-white p-1 rounded-full ml-0 mr-0 hidden lg:block"></span>
            <span className="bg-white h-[2px] w-[100px] hidden lg:block"></span>
            <span className="ml-4">
              Chúng tôi mang đến cho bạn những khoảnh khắc khó quên với những
              món ăn ngon của chúng tôi
            </span>
            <span className="bg-white h-[2px] w-[100px] ml-4 hidden lg:block"></span>
            <span className="bg-white p-1 rounded-full ml-0 mr-0 hidden lg:block"></span>
          </p>
        </div>
      </div>

      <section>
        <h2 className="text-3xl font-bold text-center mb-4">Lịch Sử</h2>

        <div className="flex flex-col items-center">
          <div className="flex space-x-4 overflow-hidden">
            {data.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedYear(item.year)}
                className={`relative group cursor-pointer transform transition-all duration-500 ${
                  selectedYear === item.year ? "-translate-y-4" : ""
                }`}
              >
                <img
                  src={item.image}
                  alt={`Year ${item.year}`}
                  className="w-40 h-32 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <span className="text-white text-lg font-bold">
                    {item.year}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 text-center max-w">
            {selectedYear ? (
              <>
                <h2
                  className="text-2xl font-semibold"
                  style={{ color: colorCode }}
                >
                  {selectedYear}
                </h2>
                <p className="mt-2 text-gray-600 text-xl">
                  {data.find((item) => item.year === selectedYear).content}
                </p>
              </>
            ) : (
              <p className="text-gray-500 text-xl">
                Chọn một năm để xem chi tiết nhé !
              </p>
            )}
          </div>
        </div>

        <div
          className="relative bg-cover bg-center h-auto w-full mt-8"
          style={{
            backgroundImage:
              "url('imgs/bg7.jpg')",
          }}
        >
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-8 space-y-8 md:space-y-0">
            <div className="relative w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
              <img
                src="imgs/ab_team_01.png"
                alt="Chef"
                className="h-[415px] object-cover mb-8 lg:block hidden"
              />
            </div>

            <div className="text-center md:text-left text-white max-w-xl">
              <p className="text-2xl md:text-2xl italic font-light leading-relaxed">
                <span className="text-4xl text-white font-semibold">“</span>
                Chúng tôi không chỉ mang đến những món ăn ngon, mà còn là những
                trải nghiệm tuyệt vời cho mỗi khách hàng. Đến với chúng tôi, bạn
                sẽ không chỉ thưởng thức những món ăn ngon mà còn cảm nhận được
                không gian ấm cúng và đẳng cấp.
                <span className="text-4xl text-white font-semibold">”</span>
              </p>
              <div className="mt-6">
                <p
                  className="text-sm font-semibold"
                  style={{ color: colorCode }}
                >
                  TIMOTHY DOE{" "}
                  <span className="text-gray-300 text-sm"> |Customer</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="py-8 mt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-6">
              {logos.map((logo, index) => (
                <div key={index} className="w-20 h-20 md:w-28 md:h-28">
                  <img
                    src={logo}
                    alt={`Logo ${index + 1}`}
                    className="object-contain w-full h-full grayscale hover:grayscale-0 transition duration-300 transform hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
