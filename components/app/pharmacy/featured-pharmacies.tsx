// import { Button } from "@/components/ui/button";
// import { Carousel, CarouselItem } from "@/components/ui/carousel";
// import { Text } from "@/components/ui/text";
// import { View } from "@/components/ui/view";
// import { useThemeColor } from "@/hooks/useThemeColor";
// import { default as React } from "react";
// import { Dimensions } from "react-native";

// const featuredPharmacies = [
//   {
//     id: "1",
//     name: "CVS Pharmacy",
//     details: "Open until 9 PM",
//     imageUrl:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuCRL2GECycfUezEGIRiUtLipZnOYr7OVqA0MHROXDJNjunrdjrFEDZuXCaOW67qjAaZtlpZVglfNZ7nkv4gXMR-uiX4dEk6TfxAow5AegP71p0hKaLoflOep5KkkH3JmBkOqr6gl7pKhuCgpd52oyec9GN36mDDhRs0AynjKd3Bj-llhWGXXjRRnFfNMfGJVYUFCf-h41nqvQNuHbJzqjuKfeCMII4ahgv6pf9rVbbIbEkqyVPOy07LJIQI5-RWTMUl473kcc2gVixg",
//   },
//   {
//     id: "2",
//     name: "Walgreens",
//     details: "Open 24 Hours",
//     imageUrl:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuB7mfZIMCkIgLAf38sVk5nNltwr5tclnxm-sMqYjc3gY55s8337-CCUNV0e2kVCgbQk_sOLtUub20bf2aAshoPBGr5yzU6Asvd2wVJTGZbPMK0C0nuIZVWMvwD6pYn7KI5bvLSduyberu6clxP-Jk3Hm1nJM-AnaSW0JB01O05wd0DhjGSEEyrKbgd390zu8pYZjx9WSAr20LUPAJqjs3OLNU4laoBUCTZC5iAiG-iZkoMSeCGO60EEc2s-CFsVynfGQESCMAFDWqs5",
//   },
//   {
//     id: "3",
//     name: "Rite Aid",
//     details: "Open until 10 PM",
//     imageUrl:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuAqCPGtEAwFlsfgjvojqG9lXhdlHZVe7mtmnnXyVQAB0gxpXt2CzrS3sAQr-PrT0SjuTNuRQl15QYytmoM3HSOE_lympbsmROVTkzT03350QbIV1nFpSsN6WVNxaQtjLoD3gs1oNW7uK8G931e5vJ9MkErFU9foQDY3pLKteVevK5BnzS0wB86CNxNgq-ZodYUawFq1pF3hnetUU6JiCZ4kPpdkojxNfMjxzR8N2AjBlpExZ8FNyk7HpYvFKpjpIW56KDZch11iTagO",
//   },
// ];

// const { width: screenWidth } = Dimensions.get("window");

// export function FeaturedPharmacies() {
//   const cardColor = useThemeColor({}, "card");
//   const textColor = useThemeColor({}, "text");

//   const products = [
//     { id: 1, name: "Wireless Headphones", price: "$99.99", rating: "4.8" },
//     { id: 2, name: "Smart Watch", price: "$199.99", rating: "4.9" },
//     { id: 3, name: "Bluetooth Speaker", price: "$79.99", rating: "4.7" },
//     { id: 4, name: "Phone Case", price: "$24.99", rating: "4.6" },
//     { id: 5, name: "Wireless Charger", price: "$39.99", rating: "4.8" },
//   ];

//   return (
//     <View style={{ gap: 8 }}>
//       <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
//         <Text variant="subtitle">Popular Pharmacies</Text>
//         <Button variant="link">see all</Button>
//       </View>

//       <Carousel
//         itemWidth={screenWidth * 0.7}
//         spacing={16}
//         style={{ padding: 0 }}
//         showIndicators={false}
//       >
//         {products.map((product) => (
//           <CarouselItem
//             key={product.id}
//             style={{
//               backgroundColor: cardColor,
//               minHeight: 160,
//               padding: 20,
//             }}
//           >
//             <View style={{ flex: 1, justifyContent: "space-between" }}>
//               <View>
//                 <Text
//                   variant="title"
//                   style={{
//                     color: textColor,
//                     fontSize: 18,
//                     marginBottom: 8,
//                   }}
//                 >
//                   {product.name}
//                 </Text>
//                 <Text
//                   style={{
//                     color: textColor,
//                     opacity: 0.7,
//                     marginBottom: 12,
//                   }}
//                 >
//                   ⭐ {product.rating} rating
//                 </Text>
//               </View>
//               <Text
//                 variant="title"
//                 style={{
//                   color: "#10b981",
//                   fontSize: 20,
//                   fontWeight: "bold",
//                 }}
//               >
//                 {product.price}
//               </Text>
//             </View>
//           </CarouselItem>
//         ))}
//       </Carousel>
//     </View>
//   );
// }

import { Button } from "@/components/ui/button";
import { Carousel, CarouselItem, CarouselRef } from "@/components/ui/carousel";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useCarouselWidth } from "@/hooks/base/use-carousel-width";
import { SPACING_SM, SPACING_XS } from "@/theme/globals";
import React, { useRef, useState } from "react";

export function FeaturedPharmacies() {
  const totalSlides = 4;
  const carouselRef = useRef<CarouselRef>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const lessons = [
    {
      title: "Introduction to React Native",
      progress: 0,
      duration: "15 min",
      bg: "#9c27b0",
      color: "#f3e5f5",
    },
    {
      title: "Component Architecture",
      progress: 45,
      duration: "20 min",
      bg: "#ff5722",
      color: "#fff3e0",
    },
    {
      title: "State Management",
      progress: 75,
      duration: "25 min",
      bg: "#00bcd4",
      color: "#e0f2f1",
    },
    {
      title: "Navigation Patterns",
      progress: 100,
      duration: "18 min",
      bg: "#ff4081",
      color: "#fce4ec",
    },
  ];

  const handleGoToSlide = (index: number) => {
    if (carouselRef.current?.goToSlide) {
      carouselRef.current.goToSlide(index);
    }
  };

  const handleGoToPrevious = () => {
    if (currentIndex > 0) {
      if (carouselRef.current?.goToPrevious) {
        carouselRef.current.goToPrevious();
      }
    }
  };

  const handleGoToNext = () => {
    if (currentIndex < totalSlides - 1) {
      if (carouselRef.current?.goToNext) {
        carouselRef.current.goToNext();
      }
    }
  };

  const handleReset = () => {
    if (carouselRef.current?.goToSlide) {
      carouselRef.current.goToSlide(0);
    }
  };

  // Handle index changes from carousel (swipe gestures AND button presses)
  const handleIndexChange = (index: number) => {
    setCurrentIndex(index);
  };

  const screenWidth = useCarouselWidth();
  return (
    <View style={{ gap: SPACING_SM }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <Text variant="subtitle">Featured Pharmacies</Text>
        <Button variant="link" size="sm">
          see all
        </Button>
      </View>
      {/* External Controls */}

      {/* Carousel */}
      <Carousel
        spacing={16}
        ref={carouselRef}
        showArrows={true}
        showIndicators={false}
        onIndexChange={handleIndexChange}
        itemWidth={screenWidth}
      >
        {lessons.map((lesson, index) => (
          <CarouselItem
            key={index}
            style={{
              padding: 0,
              backgroundColor: "transparent",
              flexDirection: "column",
              borderWidth: 0,
            }}
          >
            <View
              style={{
                flex: 1,
                gap: SPACING_SM,
                padding: SPACING_XS,
              }}
            >
              <Image
                height={"60%"}
                source={{ uri: "https://picsum.photos/500/300" }}
              />
              <Text variant="subtitle" style={{ flex: 1 }}>
                {lesson.title}
              </Text>
              <Text variant="body">description</Text>
              <Text>Rating</Text>
            </View>
          </CarouselItem>
        ))}
      </Carousel>
    </View>
  );
}
