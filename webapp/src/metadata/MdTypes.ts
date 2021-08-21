export enum MdTypes{
  None = '0000000000000000000000000',
  Catalog = '834cd9ad-9720-4fc5-aa09-cef6f7a895a0',
  Document = 'cc94220b-20f8-4a63-9f29-d02fe64ba918',
  Table = '0cf72dda-2547-4333-aec0-c852d2f3f235',
  Field = '8c474f75-b63a-4f3a-b624-f9a58cb7eeae',
  WebForm = '370c9fb7-c2c8-4360-9863-6dc456460080',
  User = '60a34539-5b85-4d96-b619-cefc7b6b894b',
  Report = 'b2aa362b-5872-411a-9cd8-fc65428e54eb',
  Subsystem = '273c017b-b7d9-49a2-ac51-e0f2d6f0f75c',
  Domains = '1ba5d068-38a7-44e5-82b8-d51e680a6cb1',
  Number = 'a6135646-7a2a-40a0-bce2-40da3f76f078',
  String ='38a7b85c-acd0-4a3a-aa2b-02f685007f49',
  Boolean= '19034973-d6a4-4dbf-b900-4eb9a78e405b', 
  UUID= 'bb5fa9d9-17f0-4246-8470-a76977058cc2',
  Date= 'f41b5064-97a6-4ff3-b878-73747f0a8733',
  Enumeration= '414d13cc-913b-424d-81b5-e57f46e9d4f1',
  EnumerationItem= '13274bca-5ab0-4c88-be70-9589763fc07f',
  MenuItem= '6929b322-5a6a-4cc7-b002-d80460776ec2'
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

