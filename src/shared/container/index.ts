import { container } from "tsyringe";
import { UserRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepository } from "../../modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";
import { ICarsRepository } from "../../modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "../../modules/cars/infra/typeorm/repositories/CarsRepository";
import { ICarsImageRepository } from "../../modules/cars/repositories/ICarsImageRepository";
import { CarsImageRepository } from "../../modules/cars/infra/typeorm/repositories/CarsImageRepository";
import { IRentalsRepository } from "../../modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "./providers/dateProvider/IDateProvider";
import { DayJsProvider } from "./providers/dateProvider/implementations/DayJsProvider";
import { RentalsRepository } from "../../modules/rentals/infra/typeorm/repositories/RentalsRepository";

// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
    "UserRepository",
    UserRepository
);

container.registerSingleton<ICarsRepository>(
    "CarsRepository",
    CarsRepository
);

container.registerSingleton<ICarsImageRepository>(
    "CarsImageRepository",
    CarsImageRepository
);

container.registerSingleton<IRentalsRepository>(
    "RentalsRepository",
    RentalsRepository
);

container.registerSingleton<IDateProvider>(
    "DayJsProvider",
    DayJsProvider
);

