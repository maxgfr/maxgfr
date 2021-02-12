## Hi there 🖖

[![Linkedin](https://img.shields.io/badge/-LinkedIn-222222?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/maxime-golfier/)](https://www.linkedin.com/in/maxime-golfier/)
[![Stack Overflow](https://img.shields.io/badge/-Stack%20Overflow-222222?style=flat-square&logo=stack-overflow&logoColor=white&link=https://stackoverflow.com/users/6491071/maxime)](https://stackoverflow.com/users/6491071/maxime)

```typescript

abstract class AbstractEngineer {
    protected coding(): void {}
}


class ConcreteEngineer extends AbstractEngineer {
    private name: string;
    private designation: string;
    private location: string;
    
    constructor(name: string, designation: string, location: string) {
        super();
        this.name = name; 
        this.designation = designation; 
        this.location = location; 
    }
    
    public me(): void {
      console.log(`I'm ${this.name}, a ${this.designation} who's been living in ${this.location}.`)
    }

}

const engineer = new ConcreteEngineer('Maxime Golfier', 'Software Engineer', 'Paris, France');
engineer.me();

```
![Maxime's github stats](https://github-readme-stats.vercel.app/api?username=maxgfr&show_icons=true&theme=nightowl)
![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=maxgfr&theme=nightowl)
