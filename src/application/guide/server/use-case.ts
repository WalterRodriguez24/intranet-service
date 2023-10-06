import { Attachment } from "@/domain/guide/server";
import db from "@/persistence/server";

export async function getGuideList() {
  const guides = await db.guide.findMany({
    take: 10,
    orderBy: {
      id: "desc",
    },
    select: {
      id: true,
      title: true,
      service_guide: {
        select: {
          service: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return guides;
}

export async function getGuidesServiceId(serviceId: number) {
  const guides = await db.guide.findMany({
    where: {
      service_guide: {
        some: {
          service_id: serviceId,
        },
      },
    },
    select: {
      id: true,
      title: true,
      service_guide: {
        select: {
          service: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return guides;
}

export async function getGuideById(id: number) {
  const guide = await db.guide.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      source_video: true,
      user: {
        select: {
          first_name: true,
          last_name: true,
          email: true,
          job_title: {
            select: {
              name: true,
            },
          },
        },
      },
      service_guide: {
        select: {
          service: {
            select: {
              name: true,
            },
          },
        },
      },
      attachment: {
        select: {
          name: true,
          path: true,
          size: true,
          type: true,
          id: true,
        },
      },
    },
  });
  return guide;
}

export async function createTextGuide(
  title: string,
  content: string,
  user_id: number,
  services: number[],
  attachment: Attachment[]
) {
  const guide = await db.guide.create({
    data: {
      title: title,
      content,
      user_id,
      service_guide: {
        createMany: {
          data: services.map((service) => ({
            service_id: service,
            created_at: new Date(),
            updated_at: new Date(),
          })),
        },
      },
      attachment: {
        createMany: {
          data: attachment.map((file) => ({
            created_at: new Date(),
            updated_at: new Date(),
            description: "",
            ...file,
          })),
        },
      },
    },
  });
  return guide;
}
