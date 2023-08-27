### Mediator
Mediator tasarım deseni, nesneler arasındaki ilişkilerin düzenlenmesi için kullanılan bir davranışsal tasarım desenidir. Bu desen, bir nesnenin diğer tüm nesnelerle iletişimini tek bir aracı nesne üzerinden yönetmeyi amaçlar. Bu yaklaşım sayesinde nesneler arasındaki iletişim karmaşıklığı azalır ve nesneler arasındaki bağlantılar daha esnek hale gelir.

Örnek olarak, bir chat odası senaryosunu düşünelim. Bu chat odasında, bir kullanıcı bir mesaj gönderdiğinde, diğer kullanıcılar bu mesajı almalıdır.

Örneği açıklamaya devam edelim. Bir kullanıcı chat odasına bir mesaj gönderdiğinde, Mediator tasarım deseni devreye girer. Mediator, bu mesajı alan ve odadaki diğer kullanıcılara ileten bir aracıdır. Bu sayede iletişim karmaşıklığı azalır ve kullanıcılar arasındaki bağlantı daha zayıf hale gelir. Her kullanıcı doğrudan diğer kullanıcılara bağlı olmadığından, iletişimdeki değişiklikler veya yeni kullanıcıların eklenmesi gibi durumlarda esneklik sağlanır. Bu şekilde, Mediator tasarım deseni chat odasında nesneler arasındaki iletişimi düzenleyerek daha verimli ve esnek bir iletişim ortamı oluşturur.

```typescript
interface Mediator {
    register: (colleague: Colleague) => void
    notify: (sender: Colleague, event: string) => void
}
```
Mediator adında bir arayüzümüz var ve içerisinde notify ve register fonksiyonları bulunmaktadır. notify fonksiyonu, mesajı gönderen kullanıcıyı ve iletilmek istenen mesajı parametre olarak alır. register fonksiyonu ise yeni bir kullanıcının chat odasına eklenmesi için kullanılır.

---

```typescript
abstract class Colleague {
    sentMessages: string[] = []
    receivedMessages: string[] = []

    constructor (protected mediator: Mediator) {
        mediator.register(this)
    }

    abstract send (message: string): void

    abstract receive (message: string): void
}
```
Colleague adında bir soyut sınıfımız bulunmaktadır. Bu sınıf, sentMessages ve receivedMessages adında iki string dizisi içermektedir. Bu diziler, kullanıcıların gönderdikleri ve aldıkları mesajları depolamak için kullanılır. Ayrıca, bu sınıfın bir constructor fonksiyonu vardır ve bu fonksiyon Mediator tipinde bir parametre alır. Bu parametre, kullanıcıların mesajlarını göndermek için kullandıkları Mediator nesnesini tutar. Soyut sınıfımız içinde ayrıca send ve receive isimli iki adet abstract fonksiyon yer almaktadır. Bu fonksiyonlar, kullanıcıların mesaj gönderme ve alma işlemlerini gerçekleştirmek için kullanılır. Bu sınıfı, Mediator tasarım desenindeki Colleague rolünü yerine getirmek için kullanıyoruz.

---

```typescript

export class User extends Colleague {
    send (message: string): void {
        this.sentMessages.push(message)
        this.mediator.notify(this, message)
    }

    receive (message: string): void {
        this.receivedMessages.push(message)
    }
}

```

User isimli bir sınıfımız bulunmaktadır, bu sınıf Colleague sınıfından türetilmiştir. Sınıfın bir constructor fonksiyonu vardır ve bu fonksiyon Mediator tipinde bir parametre alır. Bu parametre, kullanıcıların mesajlarını göndermek için kullandıkları Mediator nesnesini tutar. User sınıfı, Mediator tasarım desenindeki ConcreteColleague rolünü yerine getirmek amacıyla kullanılmaktadır. Sınıf içerisinde send ve receive isimli iki fonksiyon da yer alır ve bu fonksiyonlar kullanıcıların mesaj gönderme ve alma işlemlerini gerçekleştirmek için kullanılır.

---

```typescript

export class Chatroom implements Mediator {
  private readonly colleagues: Colleague[] = []

  register (colleague: Colleague): void {
    this.colleagues.push(colleague)
  }

  notify (sender: Colleague, event: string): void {
    this.colleagues.forEach(colleague => {
      if (colleague !== sender) {
        colleague.receive(event)
      }
    })
  }
}

```

Bu sınıf, Mediator tasarım desenindeki ConcreteMediator rolünü yerine getirmek amacıyla kullanılmaktadır. Sınıf içinde register isimli bir fonksiyon bulunmaktadır ve bu fonksiyon, yeni bir kullanıcının chat odasına eklenmesi için kullanılır. Ayrıca, sınıf içinde notify isimli bir fonksiyon daha yer almaktadır ve bu fonksiyon, chat odasına yeni bir mesaj geldiğinde bu mesajın diğer kullanıcılara iletilmesi için kullanılır.

---

Şimdi, tasarım desenini test etmek için gerekli olan tüm sınıfları oluşturduk. Şimdi bir chat odası oluşturacağız ve bu odaya 3 kullanıcı kaydedeceğiz. İlk kaydedilen kullanıcı chat odasına bir mesaj gönderecek ve diğer kullanıcılar da bu mesajı alacaklar.

```typescript
describe('mediator', function () {
    test('when a user sends a message, other users in the chatroom should receive that message', function () {
        // Arrange
        const chatroom = new Chatroom()

        const userWhichSendsMessage = new User(chatroom)
        const userWhichReceivesMessage = new User(chatroom)
        const userWhichReceivesMessage2 = new User(chatroom)

        // Act
        userWhichSendsMessage.send('hello world')

        // Assert
        expect(userWhichSendsMessage.sentMessages).toEqual(['hello world'])
        expect(userWhichSendsMessage.receivedMessages).toEqual([])
        expect(userWhichReceivesMessage.sentMessages).toEqual([])
        expect(userWhichReceivesMessage.receivedMessages).toEqual(['hello world'])
        expect(userWhichReceivesMessage2.sentMessages).toEqual([])
        expect(userWhichReceivesMessage2.receivedMessages).toEqual(['hello world'])
    })
})

```
Yukarıdaki test kodunda bir chat odası oluşturduk ve bu odaya 3 kullanıcı kaydettik. İlk kullanıcı tarafından gönderilen bir mesajın diğer kullanıcılar tarafından alınıp alınmadığını kontrol ettik. Test kodunu çalıştırdığımızda, testin başarılı olduğunu göreceksiniz.

### Chain of Responsibility

Chain of Responsibility deseni, bir isteği bir dizi nesne zinciri boyunca iletilmesini ve nesnelerden birinin isteği işleyene kadar zincirde ilerlemesini sağlar. Her nesne, isteği işler ve bir sonraki nesneye iletir. Bu desen, isteğin gönderici ve alıcısını birbirinden bağımsız hale getirir ve isteklerin esnek bir şekilde işlenmesini sağlamak için işleyicilerin dinamik olarak ayarlanması ve eklenmesine imkan tanır.

Örnek olarak, bir Order sınıfı tanımlayalım ve bu sınıfı kullanarak bir sipariş oluşturalım. Ardından, belirlediğimiz kurallara uygun olup olmadığını kontrol etmek ve işlemek için siparişi bir dizi kurala tabi tutalım. Eğer sipariş belirlediğimiz kurallara uymuyorsa, bir hata fırlatalım. Eğer herhangi bir hata oluşmazsa, sipariş tüm kurallarımıza uygun şekilde işlenmiş olur.

--- 
    
```typescript
export class Order {
  public id: number
  public amount: number
  public status: string

  constructor (id: number, amount: number, status: string) {
    this.id = id
    this.amount = amount
    this.status = status
  }
}

```
Bir "Order" sınıfı tanımladık. Bu sınıf, bir siparişin oluşturulması için id, amount ve status değerlerini alır.

---

```typescript
interface OrderHandler {
    setNextHandler: (handler: OrderHandler) => void
    handle: (order: Order) => void
}
```
OrderHandler isimli bir arayüz tanımladık. Bu arayüz içerisinde setNextHandler ve handle isimli iki fonksiyon bulunmaktadır. setNextHandler fonksiyonu, bir sonraki işleyiciyi ayarlamak için kullanılır. handle fonksiyonu ise, siparişin işlenmesi için kullanılır.

---

```typescript
export class OrderValidationHandler implements OrderHandler {
    private nextHandler: OrderHandler | null = null
    setNextHandler (handler: OrderHandler): void {
        this.nextHandler = handler
    }

    handle (order: Order): void {
        if (order.amount <= 0) {
            throw new Error('Invalid order amount')
        }
        order.status = 'validated'
        if (this.nextHandler != null) {
            this.nextHandler.handle(order)
        }
    }
}
```
OrderValidationHandler sınıfı, OrderHandler arayüzünü uygulamaktadır. Sınıf içerisinde setNextHandler ve handle adında iki fonksiyon bulunmaktadır. setNextHandler fonksiyonu, bir sonraki işleyiciyi belirlemek için kullanılır. handle fonksiyonu ise, siparişin işlenmesi için kullanılır. Bu sınıf içinde, siparişin geçerli olup olmadığını kontrol eden bir kod bulunmaktadır. Eğer siparişin tutarı 0 veya daha küçükse, sipariş geçersiz kabul edilir ve bir hata fırlatılır. Eğer siparişin tutarı pozitif ise, siparişin durumu "validated" olarak güncellenir ve bir sonraki işleyiciye iletilir.

---

```typescript
export class ShippingHandler implements OrderHandler {
  private nextHandler: OrderHandler | null = null
  setNextHandler (handler: OrderHandler): void {
    this.nextHandler = handler
  }

  handle (order: Order): void {
    order.status = 'shipped'
    if (this.nextHandler != null) {
      this.nextHandler.handle(order)
    }
  }
}
```
ShippingHandler sınıfı, OrderValidationHandler sınıfına benzerdir. Bu sınıf içerisinde siparişin işlenmesi için handle fonksiyonu bulunur. Siparişin durumu "shipped" olarak güncellenir ve bir sonraki işleyiciye iletilir.

---

Şimdi, Chain of Responsibility tasarım desenini uygulamak için gereken tüm kodları yazdık. Şimdi, deseni test etmek için gerekli olan tüm sınıfları oluşturacağız. İlk olarak, bir sipariş oluşturacağız ve bu siparişi bir dizi kurala tabi tutacağız. Eğer sipariş belirlediğimiz kurallara uymuyorsa, bir hata fırlatacağız. Ancak, sipariş tüm kurallarımıza uygun şekilde işlenirse herhangi bir hata oluşmayacak.

```typescript

describe('chain-of-responsibility', () => {
  test('order validation handler should set order status to shipped status when order is valid and handled by shipping handler', () => {
    const orderValidationHandler = new OrderValidationHandler()
    const shippingHandler = new ShippingHandler()

    orderValidationHandler.setNextHandler(shippingHandler)

    const order = new Order(1, 100, 'pending')

    orderValidationHandler.handle(order)

    expect(order.status).toEqual('shipped')
  })

  test('order validation handler should throw an error when order amount is invalid', () => {
    const orderValidationHandler = new OrderValidationHandler()
    const shippingHandler = new ShippingHandler()

    orderValidationHandler.setNextHandler(shippingHandler)

    const order = new Order(1, -100, 'pending')

    expect(() => { orderValidationHandler.handle(order) }).toThrowError('Invalid order amount')
  })
})

```
Yukarıdaki test kodunda, iki senaryoyu test ediyoruz. İlk olarak, her iki senaryo için bir sipariş oluşturuyoruz ve siparişi işlemek için bir OrderValidationHandler ve bir ShippingHandler oluşturuyoruz. Daha sonra, siparişin işlenmesi için OrderValidationHandler'ı ShippingHandler'a bağlıyoruz. Son olarak, siparişin işlenmesi için OrderValidationHandler'ı kullanıyoruz. Eğer sipariş belirlediğimiz kurallara uymuyorsa, bir hata fırlatılıyor. Ancak, sipariş belirlediğimiz kurallara uyuyorsa, siparişin durumu "shipped" olarak güncelleniyor.

Bu desenle birlikte istediğimiz zaman kolayca yeni bir handler ekleyip çıkarabiliriz. Örneğin, siparişin ödemesinin yapılması için bir PaymentHandler oluşturabiliriz. Bu handler, siparişin ödemesinin gerçekleştirilmesi için kullanılabilir. Eğer siparişin ödemesi başarılı bir şekilde tamamlanırsa, siparişin durumu "paid" olarak güncellenir ve bir sonraki handler'a iletilir. Ancak, eğer siparişin ödemesi başarısız olursa, siparişin durumu "payment failed" olarak güncellenir ve bir sonraki handler'a iletilir. Bu şekilde, Chain of Responsibility deseni sayesinde istediğimiz zaman yeni işlem adımları ekleyebilir ve siparişin işlenmesini esnek bir şekilde kontrol edebiliriz.

### Command

 Command deseni, bir işlemi bir nesne olarak kapsüller ve daha sonra bu işlemi başka bir nesne aracılığıyla yürütmek için kullanılır. Bu sayede işlemleri parametreleştirebilir, sıraya koyabilir ve geri alabilirsiniz.


Aşağıda yer alan `Command` arayüzü, tüm komut sınıflarının uygulaması gereken bir execute metodunu içerir. Komutların bu metodu gerçekleştirmesi, komutların yürütülmesi anlamına gelir.

```typescript
 interface Command {
  execute: () => void
}
````

---

Aşağıda yer alan `FileManager` sınıfı, asıl işlevselliği sağlayan dosya yönetimi işlemlerini içerir. `createFile` ve `deleteFile`metodları, dosya oluşturma ve silme işlemlerini gerçekleştirir. Aynı zamanda oluşturulan ve silinen dosya isimlerini createdFiles ve deletedFiles dizilerinde saklar.

```typescript
export class FileManager {
  createdFiles: string[] = []
  deletedFiles: string[] = []
  createFile (name: string): void {
    this.createdFiles.push(name)
  }

  deleteFile (name: string): void {
    this.deletedFiles.push(name)
  }
}
````
---

Aşağıda yer alan `CreateFileCommand` sınıfı, bir dosya oluşturma işlemini temsil eder. FileManager nesnesi ve dosya adı kurucu metodla alınır. Bu sınıf, Command arayüzünü uygulayarak execute metodunu gerçekleştirir. execute metodunda, FileManager nesnesinin createFile metoduna dosya adıyla birlikte yönlendirme yapılır. Bu sayede, komut nesnesi dosya oluşturma işlemini temsil eder.

````typescript
export class CreateFileCommand implements Command {
  constructor (private readonly fileManager: FileManager, private readonly name: string) {}

  execute (): void {
    this.fileManager.createFile(this.name)
  }
}
````

---

Aşağıda yer alan `DeleteFileCommand` sınıfı, bir dosya silme işlemini temsil eder. FileManager nesnesi ve dosya adı kurucu metodla alınır. Yine Command arayüzünü uygulayarak execute metodunu gerçekleştirir. execute metodunda, FileManager nesnesinin deleteFile metoduna dosya adıyla birlikte yönlendirme yapılır. Böylece, komut nesnesi dosya silme işlemini temsil eder.

````typescript
export class DeleteFileCommand implements Command {
  constructor (private readonly fileManager: FileManager, private readonly name: string) {}

  execute (): void {
    this.fileManager.deleteFile(this.name)
  }
}
````

---

Aşağıda yer alan `FileCommandInvoker` sınıfı, komutları yöneten ve toplu olarak yürüten bir komut yürütücüsünü temsil eder. addCommand metodu ile komutlar eklenir. executeCommands metodu, saklanan komutları sırayla çağırarak yürütür. Bu sayede komutlar toplu halde yönetilir.

````typescript
export class FileCommandInvoker {
  commands: Command[] = []

  addCommand (command: Command): void {
    this.commands.push(command)
  }

  executeCommands (): void {
    this.commands.forEach(command => { command.execute() })
    this.commands = []
  }
}
````

--- 

Şimdi, Command tasarım desenini uygulamak için gereken tüm kodları yazdık. Şimdi, deseni test etmek için gerekli olan test kodu aşağıda yer almaktadır.

````typescript
describe('command', () => {
  it('should execute file commands and update file manager accordingly', () => {
    // Arrange
    const fileManager = new FileManager()
    const fileCommandInvoker = new FileCommandInvoker()

    const commands = [
      new CreateFileCommand(fileManager, 'create.txt'),
      new DeleteFileCommand(fileManager, 'delete.txt')
    ]

    commands.forEach(command => { fileCommandInvoker.addCommand(command) })

    // Act
    fileCommandInvoker.executeCommands()

    // Assert
    expect(fileManager.createdFiles).toEqual(['create.txt'])
    expect(fileManager.deletedFiles).toEqual(['delete.txt'])
    expect(fileCommandInvoker.commands).toEqual([])
  })
})

````

Yukarıdaki kod, komut nesnelerini kullanarak dosya oluşturma ve silme işlemlerini yönetmeyi gösterir. Komutlar, CreateFileCommand ve DeleteFileCommand sınıflarıyla temsil edilir ve bu sınıflar aracılığıyla FileManager nesnesinin metodları çağrılır. FileCommandInvoker nesnesi, komutları sırayla yürüterek işlemleri gerçekleştirir ve ardından komutları temizler. Bu yaklaşım, işlemleri toplu halde yönetmek, sırayla yürütmek ve gerektiğinde geri almak için kullanışlıdır.

--- 

Kısacası, Command tasarım deseni bu kod parçasında şu işlevi yerine getiriyor:

- İşlemleri (dosya oluşturma ve silme gibi) birer nesne olarak temsil ediyor (CreateFileCommand, DeleteFileCommand).
- İşlemleri yürütmek için bir arayüz tanımlıyor (Command arayüzü).
- İşlemleri yönetmek ve sırayla yürütmek için bir komut yürütücüsü sağlıyor (FileCommandInvoker).
- Bu sayede, işlemler birer komut nesnesi olarak paketlenir ve daha sonra ihtiyaca göre sırayla çağrılabilir, saklanabilir veya geri alınabilir. Bu yapı, kodun daha modüler, esnek ve yönetilebilir olmasını sağlar.