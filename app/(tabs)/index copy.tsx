// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { ScrollView } from "@/components/ui/scroll-view";
// import { View } from "@/components/ui/view";
// import { urls } from "@/config/urls";
// import { useApiResponseToast } from "@/hooks/base/api/use-api-response-toast";
// import { useMutation } from "@/hooks/base/api/useMutation";
// import { useQuery } from "@/hooks/base/api/useQuery";
// import { useThemeColor } from "@/hooks/useThemeColor";
// import { Colors } from "@/theme/colors";
// import { BORDER_RADIUS } from "@/theme/globals";
// import { useFocusEffect } from "expo-router";
// import { default as React, useCallback, useEffect } from "react";
// import { ActivityIndicator, Text } from "react-native";

// export function AccordionStyled() {
//   const card = useThemeColor({}, "card");

//   return (
//     <View
//       style={{
//         padding: 16,
//         backgroundColor: card,
//         borderRadius: BORDER_RADIUS,
//       }}
//     >
//       <Accordion type="single" collapsible>
//         <AccordionItem value="features">
//           <AccordionTrigger>🚀 Features</AccordionTrigger>
//           <AccordionContent style={{ paddingLeft: 8 }}>
//             <Text>
//               • Cross-platform compatibility{"\n"}• TypeScript support{"\n"}•
//               Theme system integration{"\n"}• Customizable animations
//             </Text>
//           </AccordionContent>
//         </AccordionItem>
//         <AccordionItem value="performance">
//           <AccordionTrigger>⚡ Performance</AccordionTrigger>
//           <AccordionContent style={{ paddingLeft: 8 }}>
//             <Text>
//               • Optimized rendering{"\n"}• Minimal re-renders{"\n"}• Smooth
//               animations{"\n"}• Memory efficient
//             </Text>
//           </AccordionContent>
//         </AccordionItem>
//         <AccordionItem value="accessibility">
//           <AccordionTrigger>♿ Accessibility</AccordionTrigger>
//           <AccordionContent style={{ paddingLeft: 8 }}>
//             <Text>
//               • Screen reader support{"\n"}• Keyboard navigation{"\n"}• Focus
//               management{"\n"}• ARIA attributes
//             </Text>
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>
//     </View>
//   );
// }

// const Index = () => {
//   const tenantsQuery = useQuery(urls.getTenantsUrl(), {
//     apiScope: "global",
//   });

//   const tenantMutation = useMutation(urls.getTenantsUrl(), "POST", {
//     apiScope: "global",
//   });

//   useApiResponseToast({
//     isLoading: tenantMutation.isLoading,
//     isError: tenantMutation.isError,
//     isSuccess: tenantMutation.isSuccess,
//     error: tenantMutation.error,
//     data: tenantMutation.data,
//   });

//   useEffect(() => {
//     console.log("mounted");
//     return () => {
//       console.log("unmounted");
//     };
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       console.log("Screen is focused");
//       tenantsQuery.refetch();
//       return () => console.log("Screen is unfocused");
//     }, [])
//   );

//   return (
//     <ScrollView>
//       <Card>
//         <CardContent
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 16,
//           }}
//         >
//           <CardHeader>
//             <CardTitle>List of Tenants</CardTitle>
//             <CardDescription>this is a list of tenants</CardDescription>
//           </CardHeader>

//           <View style={{ flex: 1, overflow: "scroll" }}>
//             {tenantsQuery.isLoading && <ActivityIndicator />}

//             {tenantsQuery.isError && (
//               <Text>{JSON.stringify(tenantsQuery.error)}</Text>
//             )}

//             {tenantsQuery.isSuccess && (
//               <Text>{JSON.stringify(tenantsQuery.data, null, 4)}</Text>
//             )}
//           </View>

//           <Button
//             style={{
//               width: null,
//               backgroundColor: Colors.dark.blue,
//             }}
//             variant="default"
//             onPress={() => tenantsQuery.refetch()}
//           >
//             Refresh
//           </Button>

//           <Button onPress={() => tenantMutation.execute()}>
//             create tenant
//           </Button>
//         </CardContent>
//       </Card>
//     </ScrollView>
//   );
// };

// export default Index;
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import React from "react";

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" style={{ width: 400 }}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="followers">Followers</TabsTrigger>
        <TabsTrigger value="following">Following</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="more">More</TabsTrigger>
      </TabsList>

      <TabsContent value="account">
        <View style={{ paddingHorizontal: 16 }}>
          <Text variant="title" style={{ marginBottom: 8 }}>
            Account Settings
          </Text>
          <Text variant="body">
            Manage your account information and preferences here.
          </Text>
        </View>
      </TabsContent>

      <TabsContent value="followers">
        <View style={{ paddingHorizontal: 16 }}>
          <Text variant="title" style={{ marginBottom: 8 }}>
            Followers
          </Text>
          <Text variant="body">
            Manage your followers information and preferences here.
          </Text>
        </View>
      </TabsContent>

      <TabsContent value="following">
        <View style={{ paddingHorizontal: 16 }}>
          <Text variant="title" style={{ marginBottom: 8 }}>
            Following
          </Text>
          <Text variant="body">
            Manage your following information and preferences here.
          </Text>
        </View>
      </TabsContent>

      <TabsContent value="password">
        <View style={{ paddingHorizontal: 16 }}>
          <Text variant="title" style={{ marginBottom: 8 }}>
            Password Settings
          </Text>
          <Text variant="body">
            Change your password and security settings preferences here.
          </Text>
        </View>
      </TabsContent>

      <TabsContent value="settings">
        <View style={{ paddingHorizontal: 16 }}>
          <Text variant="title" style={{ marginBottom: 8 }}>
            General Settings
          </Text>
          <Text variant="body">
            Configure your application preferences and options.
          </Text>
        </View>
      </TabsContent>

      <TabsContent value="more">
        <View style={{ paddingHorizontal: 16 }}>
          <Text variant="title" style={{ marginBottom: 8 }}>
            More
          </Text>
          <Text variant="body">
            Configure your application preferences and options.
          </Text>
        </View>
      </TabsContent>
    </Tabs>
  );
}
