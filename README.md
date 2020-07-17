## Hi there 🖖

```typescript

abstract class AbstractEngineer {
    protected coding(): void {}
}


class ConcreteEngineer extends AbstractEngineer {
    name: string;
    designation: string;
    base: string;
    
    constructor(name: string, designation: string, base: string) {
        super();
        this.name = name; 
        this.designation = designation; 
        this.base = base; 
    }
    
    public me() {
      console.log(`I'm ${this.name}, a ${this.designation} who's been living in ${this.base}.`)
    }

}

const engineer = new ConcreteEngineer('Maxime Golfier', 'Software Engineer', 'Paris, France');
engineer.me();

```
