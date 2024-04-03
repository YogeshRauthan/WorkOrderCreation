import faker from "@faker-js/faker";

export function makeData(
  numWorks,
  numSubWorksPerWork,
  depth,
) {
  const generateWork = (name, currentDepth) => {
    const work = {
      name,
      rate: faker.datatype.number(500), // Mock rate
      total: faker.datatype.number(100000), // Mock total
    };

    if (currentDepth < depth) {
      work.subRows = [];
      for (let i = 1; i <= numSubWorksPerWork; i++) {
        const subWorkName = `Activity ${i}`;
        const subWork = generateWork(subWorkName, currentDepth + 1);
        work.subRows.push(subWork);
      }
    }

    return work;
  };

  const works = [];

  for (let i = 1; i <= numWorks; i++) {
    const workName = `Civil ${i}`;
    const work = generateWork(workName, 1);
    works.push(work);
  }

  return works;
}