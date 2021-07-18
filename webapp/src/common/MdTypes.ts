export enum MdTypes{
    Catalog = '834cd9ad-9720-4fc5-aa09-cef6f7a895a0',
    Document = 'cc94220b-20f8-4a63-9f29-d02fe64ba918',
    Table = '0cf72dda-2547-4333-aec0-c852d2f3f235',
    Field = '8c474f75-b63a-4f3a-b624-f9a58cb7eeae',
    WebForm = '370c9fb7-c2c8-4360-9863-6dc456460080',
    User = '60a34539-5b85-4d96-b619-cefc7b6b894b',
    Report = 'b2aa362b-5872-411a-9cd8-fc65428e54eb',
    Subsystem = '273c017b-b7d9-49a2-ac51-e0f2d6f0f75c',
    Domains = '1ba5d068-38a7-44e5-82b8-d51e680a6cb1'
}

export function getTypeIconName(mdType:MdTypes) {
    let iconName='';
    if (mdType === MdTypes.Catalog) {
        iconName = "el-icon-notebook-2";
      }
      if (mdType === MdTypes.Document) {
        iconName = "el-icon-document";
      }
      //table
      if (mdType === MdTypes.Table) {
        iconName = "el-icon-s-grid";
      }
      //field
      if (mdType === MdTypes.Field) {
        iconName = "el-icon-minus";
      }
      //WebForm
      if (mdType === MdTypes.WebForm) {
        iconName = "el-icon-s-platform";
      }
      if (mdType === MdTypes.Report) {
        iconName = 'el-icon-reading';
      }
      if (mdType === MdTypes.Subsystem) {
        iconName = 'el-icon-grape';
      }
      if (mdType === MdTypes.Domains) {
        iconName = 'el-icon-goods';
      }
      if (mdType === MdTypes.User) {
        iconName = 'el-icon-user';
      }
      return iconName;
}