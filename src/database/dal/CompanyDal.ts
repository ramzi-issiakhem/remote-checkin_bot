import Company from "../models/Company";
import { CompanyInput} from "../types";



export const createUniqueCompany = async (payload: CompanyInput): Promise<Company|null> => {
  
  const existingCompany = await getCompanyByName(payload?.name,payload?.guild_id);
  if (existingCompany != null) {
    return null;
  }

  const company = await Company.create(payload);
  return company;
}


export const getCompanyByName = async (companyName: string,guildId: string) => {
  const company = await Company.findOne({
    where: { "name": companyName, "guild_id": guildId },
  });

  return company;
}



