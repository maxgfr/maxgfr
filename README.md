# Hi there 👋

```typescript

abstract class AbstractEngineer {
    protected coding(): void {}
    protected learning(): void {}
    protected problemSolving(): void {}
}


class ConcreteEngineer extends AbstractEngineer {
    private name: string;
    private designation: string;
    private passion: string;
    
    constructor(name: string, designation: string, passion: string) {
        super();
        this.name = name;
        this.designation = designation;
        this.passion = passion;
    }
    
    public me(): void {
      console.log(`I'm ${this.name}, a ${this.designation}.`);
      console.log(`My passion? ${this.passion}!`);
    }
    
    public whatIDo(): void {
        console.log('I fix bugs, and sometimes I cause them but I’m always learning.');
    }

}

const engineer = new ConcreteEngineer(
    'Maxime Golfier',
    'Software Engineer',
    'creating impactful software'
);

engineer.me();
engineer.whatIDo();

```

![GitHub Stats](https://github-readme-stats.vercel.app/api?username=maxgfr&show_icons=true&theme=default)
