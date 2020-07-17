## Hi there 🖖

```typescript

abstract class AbstractEngineer {
    protected coding(): void {}
}


class ConcreteEngineer extends AbstractEngineer {
    name: string;
    designation: string;
    base: string;
    
    constructor(name: string, designation: string, base: string){
     this.name = name; 
     this.designation = designation; 
     this.base = base; 
    }
    
    me() {
      console.log(`me : ${this.name} - ${this.designation} - ${this.base}.`)
    }

}

```
