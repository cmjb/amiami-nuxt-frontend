import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) =>
{
  const query = getQuery(event)
  
  let skip = parseInt(query.skip);
  let take = parseInt(query.take);
  
  if(skip === 0)
  {
	  skip++;
  }
  
  const count = await prisma.figure.count();
  
  const results = await prisma.figure.findMany({
		take: take,
		cursor: {
	  		id: skip,
		},
		orderBy: {
			code: 'desc'
		}
	});
	
  
  return {
	  count,
	  results
  };
})