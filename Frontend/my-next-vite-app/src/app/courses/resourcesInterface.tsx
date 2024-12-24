export interface Resource{
  
     _id:string ;
    type: string;
    content: string;
    fileName: string;
    filePath: string;
    outdated: boolean; 
    created_at: Date;
    downloadLink:string ;
  
  }