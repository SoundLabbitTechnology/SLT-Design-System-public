import { Tab, TabList, TabPanel, Tabs } from "@soundlabbit/design-system/ui";

export default function TabsDemo() {
  return (
    <Tabs defaultValue="overview">
      <TabList aria-label="製品情報">
        <Tab value="overview">概要</Tab>
        <Tab value="specs">仕様</Tab>
        <Tab value="support">サポート</Tab>
      </TabList>
      <TabPanel value="overview">製品の概要テキストです。</TabPanel>
      <TabPanel value="specs">仕様の詳細です。</TabPanel>
      <TabPanel value="support">サポート情報です。</TabPanel>
    </Tabs>
  );
}
