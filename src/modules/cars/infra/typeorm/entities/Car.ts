import { Entity, CreateDateColumn, PrimaryColumn, Column, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Category } from "./Category";
import { Specification } from "./Specification";

@Entity("cars")
class Car {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    avaiable: boolean = true;

    @Column()
    daily_rate: number;

    @Column()
    license_plate: string;

    @Column()
    fine_amount: number;

    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;

    @Column()
    category_id: string;

    @ManyToMany(() => Specification)
    @JoinTable({
        name: "specifications_cars",
        joinColumns: [{ name : "car_id" }],
        inverseJoinColumns: [{ name : "specification_id" }]
    })
    specifications: Specification[];

    @Column()
    brand: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}

export { Car };