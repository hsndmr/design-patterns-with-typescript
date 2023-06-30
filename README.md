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